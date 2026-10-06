// Varianty tlačítek z Figmy (Button / Primary, Ghost, On-image …)
const base =
  "inline-flex items-center justify-center rounded text-button-m whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 disabled:opacity-60 disabled:cursor-not-allowed";

export const button = {
  primary: `${base} bg-navy-900 text-surface-0 px-[34px] py-[18px] hover:bg-navy-700`,
  brass: `${base} bg-brass-500 text-surface-0 px-[22px] py-[13px] hover:bg-brass-600`,
  ghost: `${base} border border-brass-500 text-brass-600 px-[24px] py-[14px] hover:bg-brass-500/10`,
  onImage: `${base} bg-surface-0 text-navy-900 px-[36px] py-[20px] hover:bg-surface-50`,
  onImageGhost: `${base} border border-surface-0 text-surface-0 px-[36px] py-[20px] hover:bg-surface-0/10`,
};

export const linkArrow = "text-label-s text-brass-600 hover:text-brass-500 whitespace-pre";
