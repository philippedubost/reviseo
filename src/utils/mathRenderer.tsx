import 'katex/dist/katex.min.css';
// @ts-ignore
import { InlineMath } from 'react-katex';

/**
 * Converts mathematical notation to LaTeX and renders it appropriately
 * @param text - The text containing mathematical notation
 * @returns Either a LaTeX-rendered component or the original text
 */
export function renderMathText(text: string) {
  // Convert common mathematical notation to LaTeX
  let processedText = text
    // Convert * to \cdot for multiplication in expressions like a*b
    .replace(/(\w)\*(\w)/g, '$1 \\cdot $2')
    // Convert ^ to proper superscript notation
    .replace(/\^(\w+)/g, '^{$1}')
    // Convert x to \times when used as multiplication
    .replace(/(\w) x (\w)/g, '$1 \\times $2')
    // Handle fractions like 1/2, 1/6 etc
    .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
    // Handle vector dot product notation a.b = ...
    .replace(/([a-zA-Z])\.([a-zA-Z])/g, '\\vec{$1} \\cdot \\vec{$2}')
    // Handle subscripts like ax, bx, etc in vector components
    .replace(/([a-zA-Z])([xyz])/g, '$1_{$2}')
    // Handle absolute value notation |...|
    .replace(/\|([^|]+)\|/g, '|$1|')
    // Handle parentheses in expressions
    .replace(/\(([^)]+)\)/g, '($1)');

  // Check if the text contains mathematical notation that should be rendered with LaTeX
  const hasMath = /[\\^_{}\cdot\times\frac\vec]/.test(processedText) || 
                  /\b[a-z][xyz]\b/.test(text) || // vector components like ax, by, cz
                  /\b[a-z]\s*\.\s*[a-z]\b/.test(text) || // dot products like a.b
                  /\d+\/\d+/.test(text) || // fractions
                  /\^/.test(text); // exponents

  if (hasMath) {
    try {
      return <InlineMath math={processedText} />;
    } catch (error) {
      // Fallback to original text if LaTeX parsing fails
      console.warn('LaTeX parsing error:', error);
      return text;
    }
  }

  return text;
}