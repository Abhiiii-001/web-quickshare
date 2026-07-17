"use client";

interface AdSlotProps {
  /**
   * Position identifier for the ad slot.
   * - "header-below": Below the page header
   * - "in-content": Within long-form content after meaningful sections
   * - "sidebar": Sidebar (desktop only)
   * - "above-footer": Above the footer
   */
  position: "header-below" | "in-content" | "sidebar" | "above-footer";
  className?: string;
}

/**
 * AdSense Ad Slot Placeholder
 *
 * After AdSense approval:
 * 1. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in your .env
 * 2. Replace the placeholder content below with actual ad unit code:
 *
 *    <ins className="adsbygoogle"
 *         style={{ display: "block" }}
 *         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *         data-ad-slot="XXXXXXXXXX"
 *         data-ad-format="auto"
 *         data-full-width-responsive="true" />
 *
 * 3. Call (window.adsbygoogle = window.adsbygoogle || []).push({});
 */
export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Don't render anything if no AdSense client ID is configured
  if (!clientId) return null;

  const positionStyles: Record<string, string> = {
    "header-below": "w-full max-w-4xl mx-auto my-4",
    "in-content": "w-full max-w-3xl mx-auto my-8",
    sidebar: "hidden lg:block w-full max-w-xs",
    "above-footer": "w-full max-w-4xl mx-auto my-6",
  };

  return (
    <div
      className={`relative z-10 ${positionStyles[position]} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      data-ad-position={position}
    >
      {/* 
        ═══════════════════════════════════════════════════════════
        ADSENSE AD UNIT PLACEHOLDER
        
        Insert your AdSense ad unit code here after approval.
        Position: {position}
        
        Example:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client={clientId}
             data-ad-slot="YOUR_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true" />
        ═══════════════════════════════════════════════════════════
      */}
    </div>
  );
}
