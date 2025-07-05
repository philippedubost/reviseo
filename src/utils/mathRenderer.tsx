import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Automatically detects and converts mathematical expressions to LaTeX format
 * @param text - The text to process
 * @returns Text with mathematical expressions converted to LaTeX
 */
function autoFormatMath(text: string): string {
  if (!text) return text;
  
  // If text already contains LaTeX delimiters, return as-is
  if (text.includes('$')) {
    return text;
  }
  
  let processedText = text;
  let hasTransformations = false;
  
  // Step 1: Handle function notation F(x), g(y), sin(x), etc.
  const originalText = processedText;
  processedText = processedText.replace(
    /\b([a-zA-Z]+)\s*\(\s*([a-zA-Z0-9+\-*/^_\s,]+)\s*\)/g,
    '$1($2)'
  );
  if (processedText !== originalText) hasTransformations = true;
  
  // Step 2: Handle equations with = sign (but only if they look mathematical)
  processedText = processedText.replace(
    /\b([a-zA-Z0-9+\-*/^_\s()]+)\s*=\s*([a-zA-Z0-9+\-*/^_\s()]+)/g,
    (match, left, right) => {
      // Only transform if it looks like a mathematical equation
      if (/[a-zA-Z]\(|[+\-*/^_]|\d+[a-zA-Z]|[a-zA-Z]\d/.test(left + right)) {
        hasTransformations = true;
        return `${left} = ${right}`;
      }
      return match;
    }
  );
  
  // Step 3: Handle mathematical operators and inequalities
  processedText = processedText.replace(
    /\b(\w+)\s*(<=|>=|!=|≤|≥|≠|<|>)\s*(\w+)/g,
    (match, left, op, right) => {
      const latexOp = op.replace('<=', '\\leq')
                       .replace('>=', '\\geq')
                       .replace('!=', '\\neq')
                       .replace('≤', '\\leq')
                       .replace('≥', '\\geq')
                       .replace('≠', '\\neq');
      hasTransformations = true;
      return `${left} ${latexOp} ${right}`;
    }
  );
  
  // Step 4: Handle fractions like 1/2, 3/4, etc.
  processedText = processedText.replace(
    /\b(\d+)\s*\/\s*(\d+)\b/g,
    (match, num, den) => {
      hasTransformations = true;
      return `\\frac{${num}}{${den}}`;
    }
  );
  
  // Step 5: Handle exponents with ^ notation
  processedText = processedText.replace(
    /([a-zA-Z0-9)]+)\s*\^\s*([a-zA-Z0-9]+)/g,
    (match, base, exp) => {
      hasTransformations = true;
      return `${base}^{${exp}}`;
    }
  );
  
  // Step 6: Handle subscripts with _ notation
  processedText = processedText.replace(
    /([a-zA-Z0-9)]+)\s*_\s*([a-zA-Z0-9]+)/g,
    (match, base, sub) => {
      hasTransformations = true;
      return `${base}_{${sub}}`;
    }
  );
  
  // Step 7: Handle coefficients with variables (like 3x, -2y) but be more careful
  processedText = processedText.replace(
    /\b(\d+)\s*([a-zA-Z])\b(?![a-zA-Z])/g,
    (match, coeff, variable) => {
      // Only transform if it's clearly mathematical (not part of a word)
      hasTransformations = true;
      return `${coeff}${variable}`;
    }
  );
  
  // Step 8: Handle square roots
  processedText = processedText.replace(
    /√\s*\(([^)]+)\)|√\s*(\w+)/g,
    (match, p1, p2) => {
      hasTransformations = true;
      return `\\sqrt{${p1 || p2}}`;
    }
  );
  
  // Step 9: Handle special symbols and Greek letters
  processedText = processedText.replace(/\bpi\b/g, () => {
    hasTransformations = true;
    return '\\pi';
  });
  processedText = processedText.replace(/\b(infinity|∞)\b/g, () => {
    hasTransformations = true;
    return '\\infty';
  });
  processedText = processedText.replace(
    /\b(alpha|beta|gamma|delta|epsilon|theta|lambda|mu|sigma|phi|psi|omega)\b/g,
    (match, letter) => {
      hasTransformations = true;
      return `\\${letter}`;
    }
  );
  
  // Step 10: Handle multiplication symbols
  processedText = processedText.replace(/\s*\*\s*/g, () => {
    hasTransformations = true;
    return ' \\cdot ';
  });
  processedText = processedText.replace(/\s*×\s*/g, () => {
    hasTransformations = true;
    return ' \\times ';
  });
  
  // Step 11: Handle division symbols
  processedText = processedText.replace(/\s*÷\s*/g, () => {
    hasTransformations = true;
    return ' \\div ';
  });
  
  // Only wrap in LaTeX if we actually made transformations
  if (hasTransformations) {
    return `$${processedText}$`;
  }
  
  return processedText;
}

/**
 * Renders text with LaTeX mathematical formatting
 * Supports inline math with $...$ and display math with $$...$$
 * Also automatically detects and formats mathematical expressions
 * @param text - The text to render, potentially containing LaTeX formulas or mathematical expressions
 * @returns React element with properly formatted mathematical content
 */
export function renderMathText(text: string): React.ReactElement {
  if (!text) {
    return <span className="font-normal"></span>;
  }

  // First, try to auto-format mathematical expressions
  const autoFormattedText = autoFormatMath(text);
  
  // Split text by LaTeX delimiters
  const parts = [];
  let currentIndex = 0;
  
  // Regular expressions for LaTeX patterns
  const displayMathRegex = /\$\$([^$]+)\$\$/g;
  const inlineMathRegex = /\$([^$]+)\$/g;
  
  // Find all matches for display math ($$...$$) first
  const displayMatches = Array.from(autoFormattedText.matchAll(displayMathRegex));
  // Find all matches for inline math ($...$) 
  const inlineMatches = Array.from(autoFormattedText.matchAll(inlineMathRegex))
    .filter(match => {
      // Filter out inline matches that are part of display math
      return !displayMatches.some(displayMatch => 
        match.index! >= displayMatch.index! && 
        match.index! < displayMatch.index! + displayMatch[0].length
      );
    });
  
  // Combine and sort all matches by position
  const allMatches = [...displayMatches, ...inlineMatches]
    .sort((a, b) => a.index! - b.index!);
  
  if (allMatches.length === 0) {
    // No LaTeX found, return plain text
    return <span className="font-normal">{autoFormattedText}</span>;
  }
  
  // Process each match
  allMatches.forEach((match, index) => {
    const matchStart = match.index!;
    const matchEnd = matchStart + match[0].length;
    
    // Add text before the match
    if (currentIndex < matchStart) {
      const beforeText = autoFormattedText.substring(currentIndex, matchStart);
      if (beforeText) {
        parts.push(
          <span key={`text-${index}`} className="font-normal">
            {beforeText}
          </span>
        );
      }
    }
    
    // Add the LaTeX math
    const mathContent = match[1];
    const isDisplayMath = match[0].startsWith('$$');
    
    try {
      const html = katex.renderToString(mathContent, {
        displayMode: isDisplayMath,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: {
          // Add common mathematical macros
          "\\R": "\\mathbb{R}",
          "\\N": "\\mathbb{N}",
          "\\Z": "\\mathbb{Z}",
          "\\Q": "\\mathbb{Q}",
          "\\C": "\\mathbb{C}",
          "\\infty": "\\infty",
          "\\lim": "\\lim",
          "\\sum": "\\sum",
          "\\prod": "\\prod",
          "\\int": "\\int",
          "\\frac": "\\frac",
          "\\sqrt": "\\sqrt",
          "\\sin": "\\sin",
          "\\cos": "\\cos",
          "\\tan": "\\tan",
          "\\log": "\\log",
          "\\ln": "\\ln",
          "\\exp": "\\exp",
          "\\pi": "\\pi",
          "\\alpha": "\\alpha",
          "\\beta": "\\beta",
          "\\gamma": "\\gamma",
          "\\delta": "\\delta",
          "\\theta": "\\theta",
          "\\lambda": "\\lambda",
          "\\mu": "\\mu",
          "\\sigma": "\\sigma",
          "\\phi": "\\phi",
          "\\psi": "\\psi",
          "\\omega": "\\omega",
          "\\leq": "\\leq",
          "\\geq": "\\geq",
          "\\neq": "\\neq",
          "\\approx": "\\approx",
          "\\equiv": "\\equiv",
          "\\pm": "\\pm",
          "\\mp": "\\mp",
          "\\cdot": "\\cdot",
          "\\times": "\\times",
          "\\div": "\\div",
          "\\partial": "\\partial",
          "\\nabla": "\\nabla",
          "\\rightarrow": "\\rightarrow",
          "\\leftarrow": "\\leftarrow",
          "\\Rightarrow": "\\Rightarrow",
          "\\Leftarrow": "\\Leftarrow",
          "\\leftrightarrow": "\\leftrightarrow",
          "\\Leftrightarrow": "\\Leftrightarrow"
        }
      });
      
      parts.push(
        <span
          key={`math-${index}`}
          className={`math-content ${isDisplayMath ? 'display-math' : 'inline-math'}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (error) {
      // If LaTeX rendering fails, show the raw content
      console.warn('LaTeX rendering failed for:', mathContent, error);
      parts.push(
        <span 
          key={`math-error-${index}`} 
          className="font-mono text-red-600 bg-red-100 px-1 rounded"
          title="LaTeX rendering error"
        >
          {match[0]}
        </span>
      );
    }
    
    currentIndex = matchEnd;
  });
  
  // Add any remaining text after the last match
  if (currentIndex < autoFormattedText.length) {
    const afterText = autoFormattedText.substring(currentIndex);
    if (afterText) {
      parts.push(
        <span key="text-final" className="font-normal">
          {afterText}
        </span>
      );
    }
  }
  
  return <span className="math-renderer">{parts}</span>;
}

/**
 * Utility function to check if text contains LaTeX formulas or mathematical expressions
 * @param text - The text to check
 * @returns boolean indicating if LaTeX formulas or math expressions are present
 */
export function hasLatexFormulas(text: string): boolean {
  if (!text) return false;
  
  const displayMathRegex = /\$\$([^$]+)\$\$/g;
  const inlineMathRegex = /\$([^$]+)\$/g;
  
  // Check for explicit LaTeX
  if (displayMathRegex.test(text) || inlineMathRegex.test(text)) {
    return true;
  }
  
  // Check for mathematical expressions that would be auto-formatted
  const mathPatterns = [
    /\b[a-zA-Z]+\s*\([^)]+\)/,                    // Functions like F(x), sin(x)
    /\b\w+\s*[=<>≤≥≠]\s*\w+/,                     // Equations/inequalities
    /\b\d+\s*[a-zA-Z]\b(?![a-zA-Z])/,             // Coefficients like 3x, 2y
    /\b\d+\s*\/\s*\d+\b/,                         // Fractions like 1/2
    /[a-zA-Z0-9)]+\s*\^\s*[a-zA-Z0-9]+/,         // Exponents like x^2
    /[a-zA-Z0-9)]+\s*_\s*[a-zA-Z0-9]+/,          // Subscripts like x_1
    /√/,                                          // Square roots
    /\b(pi|infinity|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|sigma|phi|psi|omega)\b/, // Greek letters
    /\s*[*×÷]\s*/                                 // Multiplication/division symbols
  ];
  
  return mathPatterns.some(pattern => pattern.test(text));
}

/**
 * Utility function to validate LaTeX syntax
 * @param latex - The LaTeX string to validate
 * @returns boolean indicating if the LaTeX is valid
 */
export function isValidLatex(latex: string): boolean {
  try {
    katex.renderToString(latex, {
      throwOnError: true,
      strict: false
    });
    return true;
  } catch (error) {
    return false;
  }
}