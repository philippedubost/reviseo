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

  // More conservative check for mathematical notation that truly needs LaTeX
  const hasMath = /[\\^_{}\cdot\times\frac\vec]/.test(processedText) || 
                  /\d+\/\d+/.test(text) || // fractions
                  /\^\d+/.test(text) || // clear exponents
                  /\b[a-z]\s*\.\s*[a-z]\b/.test(text) || // dot products like a.b
                  /\b[a-z][xyz]\b/.test(text); // vector components like ax, by, cz

  if (hasMath) {
    try {
      return (
        <span className="font-normal">
          <InlineMath math={processedText} />
        </span>
      );
    } catch (error) {
      // Fallback to original text if LaTeX parsing fails
      console.warn('LaTeX parsing error:', error);
      return <span className="font-normal">{text}</span>;
    }
  }

  // Return text with standard font for non-math content
  return <span className="font-normal">{text}</span>;
}