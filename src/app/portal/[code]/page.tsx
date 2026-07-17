"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPortalMeta,
  setPortalState,
  updateContent,
  updateActiveUsers,
  updateSettings,
} from "@/store/slices/portalSlice";
import { io, Socket } from "socket.io-client";
import Editor from "@monaco-editor/react";
import {
  Loader2,
  Users,
  Lock,
  Code,
  Share2,
  Shield,
  ShieldAlert,
  Download,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import AuroraBackground from "@/app/_components/AuroraBackground";

export default function PortalPage() {
  const { code } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const portal = useAppSelector((state) => state.portal);

  const [password, setPassword] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  // Ref to prevent echo when receiving our own updates
  const isUpdatingFromSocket = useRef(false);
  // Guard to prevent double auto-join
  const hasAttemptedJoin = useRef(false);

  useEffect(() => {
    if (code) {
      dispatch(fetchPortalMeta(code as string));
    }
  }, [code, dispatch]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const connectSocket = useCallback(
    (pwd: string) => {
      setIsJoining(true);

      const newSocket = io(
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000",
      );

      const creatorToken = localStorage.getItem(`portal_creator_${code}`);

      newSocket.on("connect", () => {
        newSocket.emit("join-portal", {
          code,
          creatorToken,
          password: pwd,
        });
      });

      newSocket.on("joined-portal", (response: any) => {
        if (response.success) {
          setIsJoined(true);
          dispatch(
            setPortalState({
              role: response.role,
              content: response.data.content,
              language: response.data.language,
              isEditable: response.data.isEditable,
              activeUsers: response.data.activeUsers,
            }),
          );
        }
        setIsJoining(false);
      });

      newSocket.on("error", (error: any) => {
        toast.error(error.message);
        newSocket.disconnect();
        setIsJoining(false);
      });

      newSocket.on(
        "code-update",
        ({ codeContent }: { codeContent: string }) => {
          isUpdatingFromSocket.current = true;
          dispatch(updateContent(codeContent));
        },
      );

      newSocket.on(
        "permission-update",
        ({
          isEditable,
          language,
        }: {
          isEditable: boolean;
          language: string;
        }) => {
          dispatch(updateSettings({ isEditable, language }));
          toast.info("Portal settings updated by creator");
        },
      );

      newSocket.on("active-users", (count: number) => {
        dispatch(updateActiveUsers(count));
      });

      setSocket(newSocket);
    },
    [code, dispatch],
  );

  // Auto-join for non-password portals once metadata is loaded
  useEffect(() => {
    if (
      !portal.isLoading &&
      !portal.error &&
      portal.code &&
      !portal.hasPassword &&
      !isJoined &&
      !hasAttemptedJoin.current
    ) {
      hasAttemptedJoin.current = true;
      // avoid calling setState synchronously inside effect to prevent cascading renders
      // schedule connect on next tick
      setTimeout(() => connectSocket(""), 0);
    }
  }, [
    portal.isLoading,
    portal.error,
    portal.code,
    portal.hasPassword,
    isJoined,
    connectSocket,
  ]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectSocket(password);
  };

  const handleEditorChange = (value: string | undefined) => {
    const val = value || "";
    dispatch(updateContent(val));
    if (!isUpdatingFromSocket.current && socket) {
      socket.emit("code-update", { codeContent: val });
    }
    isUpdatingFromSocket.current = false;
  };

  const toggleEditable = () => {
    if (portal.role === "creator" && socket) {
      const newEditable = !portal.isEditable;
      dispatch(
        updateSettings({ isEditable: newEditable, language: portal.language }),
      );
      socket.emit("permission-update", {
        isEditable: newEditable,
        language: portal.language,
      });
    }
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (portal.role === "creator" && socket) {
      const newLang = e.target.value;
      dispatch(
        updateSettings({ isEditable: portal.isEditable, language: newLang }),
      );
      socket.emit("permission-update", {
        isEditable: portal.isEditable,
        language: newLang,
      });
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const downloadCode = () => {
    const extMap: Record<string, string> = {
      python: "py",
      javascript: "js",
      html: "html",
      java: "java",
      cpp: "cpp",
      plaintext: "txt",
    };
    const ext = extMap[portal.language] || "txt";
    const blob = new Blob([portal.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapidshare_${code}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (portal.isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (portal.error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold">Portal Error</h1>
        <p className="text-gray-400">{portal.error}</p>
        <Link
          href="/"
          className="px-6 py-2 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-700 transition"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Password Gate
  if (!isJoined && portal.hasPassword) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 px-4 relative overflow-hidden">
        <AuroraBackground />
        <div className="z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                Locked Portal
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Enter password to join portal {code}
              </p>
            </div>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <button
              type="submit"
              disabled={isJoining || !password}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center"
            >
              {isJoining ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Unlock & Join"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Joining spinner (non-password portal connecting)
  if (!isJoined) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <span className="ml-3 text-white font-bold">Joining portal...</span>
      </div>
    );
  }

  // Main Workspace
  const isReadOnly = portal.role === "guest" && !portal.isEditable;

  return (
    <div className="h-screen flex flex-col bg-[#0e0e11] text-gray-200 overflow-hidden font-sans">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#141419]">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-lg shadow-lg">
              ⚡
            </div>
          </Link>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              Portal <span className="text-indigo-400">{code}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">
              {portal.activeUsers} Online
            </span>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${portal.role === "creator" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-gray-500/10 border-gray-500/20 text-gray-400"}`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {portal.role}
            </span>
          </div>

          <button
            onClick={copyShareLink}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Copy Share Link"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={downloadCode}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Download Code"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative">
          {isReadOnly && (
            <div className="absolute top-4 right-6 z-10 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
              <Lock className="w-3 h-3" /> Read Only
            </div>
          )}
          <Editor
            height="100%"
            language={
              portal.language === "plaintext" ? "text" : portal.language
            }
            theme="vs-dark"
            value={portal.content}
            onChange={handleEditorChange}
            options={{
              readOnly: isReadOnly,
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "'Share Tech Mono', monospace",
              padding: { top: 24, bottom: 24 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              renderLineHighlight: "all",
            }}
            loading={
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            }
          />
        </div>

        {portal.role === "creator" && (
          <div className="w-64 border-l border-white/5 bg-[#141419] p-4 flex flex-col gap-6 shrink-0 overflow-y-auto">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Language
              </h3>
              <select
                value={portal.language}
                onChange={changeLanguage}
                className="w-full bg-[#1e1e24] border border-white/10 text-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none transition-colors"
              >
                <option value="javascript">JavaScript / TS</option>
                <option value="python">Python</option>
                <option value="html">HTML / CSS</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="plaintext">Plain Text</option>
              </select>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Permissions
              </h3>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Guests Can Edit
                </span>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={portal.isEditable}
                    onChange={toggleEditable}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {portal.isEditable
                  ? "Anyone with the code can edit the content."
                  : "Guests can only view the content. They cannot make changes."}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="text-xs text-gray-500 text-center">
                Code Portal expires in{" "}
                <span className="font-bold text-indigo-400">24h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
