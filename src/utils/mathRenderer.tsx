import 'katex/dist/katex.min.css';
import React from 'react';
// @ts-ignore
import { InlineMath } from 'react-katex';

/**
 * Converts mathematical notation to LaTeX and renders it appropriately
 * Renders French text in standard font, math expressions in LaTeX
 * @param text - The text containing mathematical notation
 * @returns React element with mixed text and math rendering
 */
export function renderMathText(text: string) {
  // Patterns pour identifier les expressions mathématiques
  const mathPatterns = [
    // Fonctions mathématiques: f(x), g(t), sin(x), etc.
    /\b[a-zA-Z]+\([^)]*\)/g,
    // Fractions: 1/2, 3/4, etc.
    /\b\d+\/\d+\b/g,
    // Exposants: x^2, a^n, etc.
    /\b[a-zA-Z]\^\w+/g,
    // Variables avec indices: x_1, a_n, etc.
    /\b[a-zA-Z]_\w+/g,
    // Expressions avec opérateurs mathématiques entourées d'espaces
    /\b[a-zA-Z0-9]+\s*[+\-*/=<>]\s*[a-zA-Z0-9]+/g,
    // Variables isolées (une seule lettre suivie d'un espace ou fin de phrase)
    /\b[a-zA-Z]\b(?=\s|$|[,.])/g,
    // Nombres avec unités ou symboles mathématiques
    /\b\d+[°%π]\b/g,
    // Expressions entre parenthèses avec variables
    /\([^)]*[a-zA-Z][^)]*\)/g,
  ];

  // Collecter toutes les expressions mathématiques
  const mathExpressions = new Set<string>();
  mathPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => mathExpressions.add(match));
    }
  });

  // Si aucune expression mathématique trouvée, retourner le texte normal
  if (mathExpressions.size === 0) {
    return <span className="font-normal">{text}</span>;
  }

  // Créer un pattern pour diviser le texte
  const allMathExpressions = Array.from(mathExpressions);
  const escapedExpressions = allMathExpressions.map(expr => 
    expr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const splitPattern = new RegExp(`(${escapedExpressions.join('|')})`, 'g');

  // Diviser le texte en segments
  const segments = text.split(splitPattern).filter(segment => segment.length > 0);

  // Fonction pour convertir les expressions mathématiques en LaTeX
  const convertToLatex = (expr: string): string => {
    return expr
      // Convertir les fractions
      .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
      // Convertir les exposants
      .replace(/\^(\w+)/g, '^{$1}')
      // Convertir les indices
      .replace(/_(\w+)/g, '_{$1}')
      // Convertir la multiplication par un point
      .replace(/\*/g, '\\cdot ')
      // Garder les autres expressions telles quelles
      ;
  };

  // Rendre les segments
  return (
    <span className="font-normal">
      {segments.map((segment, index) => {
        if (mathExpressions.has(segment)) {
          // C'est une expression mathématique, la rendre en LaTeX
          try {
            return (
              <InlineMath 
                key={index} 
                math={convertToLatex(segment)} 
              />
            );
          } catch (error) {
            // Si LaTeX échoue, retourner le texte original
            console.warn('LaTeX parsing error for:', segment, error);
            return <span key={index}>{segment}</span>;
          }
        } else {
          // C'est du texte normal, le rendre en police standard
          return <span key={index}>{segment}</span>;
        }
      })}
    </span>
  );
}