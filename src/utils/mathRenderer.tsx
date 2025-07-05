import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Renders text with LaTeX mathematical formatting
 * Supports inline math with $...$ and display math with $$...$$
 * @param text - The text to render, potentially containing LaTeX formulas
 * @returns React element with properly formatted mathematical content
 */
export function renderMathText(text: string): React.ReactElement {
  if (!text) {
    return <span className="font-normal"></span>;
  }

  // Split text by LaTeX delimiters
  const parts = [];
  let currentIndex = 0;
  
  // Regular expressions for LaTeX patterns
  const displayMathRegex = /\$\$([^$]+)\$\$/g;
  const inlineMathRegex = /\$([^$]+)\$/g;
  
  // Find all matches for display math ($$...$$) first
  const displayMatches = Array.from(text.matchAll(displayMathRegex));
  // Find all matches for inline math ($...$) 
  const inlineMatches = Array.from(text.matchAll(inlineMathRegex))
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
    return <span className="font-normal">{text}</span>;
  }
  
  // Process each match
  allMatches.forEach((match, index) => {
    const matchStart = match.index!;
    const matchEnd = matchStart + match[0].length;
    
    // Add text before the match
    if (currentIndex < matchStart) {
      const beforeText = text.substring(currentIndex, matchStart);
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
  if (currentIndex < text.length) {
    const afterText = text.substring(currentIndex);
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
 * Utility function to check if text contains LaTeX formulas
 * @param text - The text to check
 * @returns boolean indicating if LaTeX formulas are present
 */
export function hasLatexFormulas(text: string): boolean {
  if (!text) return false;
  
  const displayMathRegex = /\$\$([^$]+)\$\$/g;
  const inlineMathRegex = /\$([^$]+)\$/g;
  
  return displayMathRegex.test(text) || inlineMathRegex.test(text);
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