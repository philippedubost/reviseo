import React from 'react';

/**
 * Renders text in a normal font without any mathematical formatting
 * This is a simplified version that removes all LaTeX rendering
 * @param text - The text to render
 * @returns React element with plain text rendering
 */
export function renderMathText(text: string): React.ReactElement {
  // Simply return the text as-is without any mathematical processing
  return <span className="font-normal">{text}</span>;
}