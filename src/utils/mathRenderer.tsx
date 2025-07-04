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
  // Patterns pour identifier UNIQUEMENT les structures mathématiques complexes
  const mathPatterns = [
    // Limites: lim, lim_{x->a}, lim_{n->∞}, etc.
    /\blim\s*(?:_{[^}]*})?\s*[a-zA-Z0-9()/\s\-+*=<>]+/gi,
    // Sommations: ∑, sum, Σ avec indices
    /(?:∑|sum|Σ)\s*(?:_{[^}]*})?\s*(?:\^{[^}]*})?\s*[a-zA-Z0-9()/\s\-+*=<>]+/gi,
    // Intégrales: ∫, int avec bornes
    /(?:∫|int)\s*(?:_{[^}]*})?\s*(?:\^{[^}]*})?\s*[a-zA-Z0-9()/\s\-+*=<>dx]+/gi,
    // Dérivées: d/dx, ∂/∂x, f'(x), etc.
    /(?:d\/d[a-zA-Z]|∂\/∂[a-zA-Z]|[a-zA-Z]'+\([^)]*\))/g,
    // Fonctions mathématiques définies: f(x) = expression, g(t) = expression, etc.
    /\b[a-zA-Z]+\s*\([^)]*\)\s*=\s*[a-zA-Z0-9()\s\-+*/\^]+/g,
    // Polynômes avec variables: 3x + 5y + 1, 2x² - 3x + 1, etc.
    /\b(?:\d*[a-zA-Z](?:\^\d+)?(?:\s*[+\-]\s*\d*[a-zA-Z](?:\^\d+)?)*|[a-zA-Z](?:\^\d+)?(?:\s*[+\-]\s*\d*[a-zA-Z](?:\^\d+)?)+)(?:\s*[+\-]\s*\d+)?\b/g,
    // Racines complexes: √(...), sqrt(...) avec expressions
    /(?:√|sqrt)\s*\([^)]*[a-zA-Z+\-*/][^)]*\)/g,
    // Fractions complexes avec variables: (a+b)/(c+d), sin(x)/cos(x), etc.
    /\([^)]*[a-zA-Z][^)]*\)\s*\/\s*\([^)]*[a-zA-Z][^)]*\)/g,
    // Puissances avec expressions complexes: (a+b)^{n}, e^{-x}, etc.
    /(?:\([^)]*[a-zA-Z][^)]*\)|\b[a-zA-Z]+)\s*\^\s*\{[^}]*[a-zA-Z+\-*/][^}]*\}/g,
    // Fonctions transcendantes avec arguments complexes: sin(2x+1), ln(x²+1), etc.
    /\b(?:sin|cos|tan|ln|log|exp|arcsin|arccos|arctan|sinh|cosh|tanh)\s*\([^)]*[a-zA-Z+\-*/\^][^)]*\)/gi,
    // Équations et inéquations complexes avec plusieurs termes
    /[a-zA-Z0-9()\s\-+*/\^]+\s*(?:=|≠|<|>|≤|≥|≡)\s*[a-zA-Z0-9()\s\-+*/\^]*[a-zA-Z()\^][a-zA-Z0-9()\s\-+*/\^]*/g,
    // Matrices et vecteurs avec notation complexe: |a×b|, det(A), etc.
    /(?:\|[^|]*[a-zA-Z×\s+\-*/][^|]*\||det\s*\([^)]*\)|tr\s*\([^)]*\))/g,
    // Produits scalaires et vectoriels complexes: a⃗·b⃗, a×b, etc.
    /[a-zA-Z]\s*(?:⃗|vec)\s*[·×]\s*[a-zA-Z]\s*(?:⃗|vec)|[a-zA-Z]\s*[·×]\s*[a-zA-Z]/g,
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

  // Fonction pour convertir les expressions mathématiques complexes en LaTeX
  const convertToLatex = (expr: string): string => {
    return expr
      // Convertir les limites
      .replace(/\blim\s*(?:_{([^}]*)})?/gi, (match, subscript) => 
        subscript ? `\\lim_{${subscript}}` : '\\lim')
      // Convertir les sommations
      .replace(/(?:∑|sum|Σ)\s*(?:_{([^}]*)})?(?:\^{([^}]*)})?/gi, (match, lower, upper) => {
        let result = '\\sum';
        if (lower) result += `_{${lower}}`;
        if (upper) result += `^{${upper}}`;
        return result;
      })
      // Convertir les intégrales
      .replace(/(?:∫|int)\s*(?:_{([^}]*)})?(?:\^{([^}]*)})?/gi, (match, lower, upper) => {
        let result = '\\int';
        if (lower) result += `_{${lower}}`;
        if (upper) result += `^{${upper}}`;
        return result;
      })
      // Convertir les dérivées
      .replace(/d\/d([a-zA-Z])/g, '\\frac{d}{d$1}')
      .replace(/∂\/∂([a-zA-Z])/g, '\\frac{\\partial}{\\partial$1}')
      // Convertir les racines
      .replace(/(?:√|sqrt)\s*\(([^)]*)\)/g, '\\sqrt{$1}')
      // Convertir les fractions complexes
      .replace(/\(([^)]*)\)\s*\/\s*\(([^)]*)\)/g, '\\frac{$1}{$2}')
      // Convertir les puissances complexes
      .replace(/\^\s*\{([^}]*)\}/g, '^{$1}')
      // Convertir les fonctions transcendantes
      .replace(/\b(sin|cos|tan|ln|log|exp|arcsin|arccos|arctan|sinh|cosh|tanh)\s*\(([^)]*)\)/gi, '\\$1($2)')
      // Convertir les opérateurs de comparaison
      .replace(/≠/g, '\\neq')
      .replace(/≤/g, '\\leq')
      .replace(/≥/g, '\\geq')
      .replace(/≡/g, '\\equiv')
      // Convertir les produits vectoriels
      .replace(/×/g, '\\times')
      .replace(/·/g, '\\cdot')
      // Convertir les vecteurs
      .replace(/([a-zA-Z])⃗/g, '\\vec{$1}')
      .replace(/vec\s*\(([^)]*)\)/g, '\\vec{$1}')
      // Convertir les valeurs absolues et déterminants
      .replace(/det\s*\(([^)]*)\)/g, '\\det($1)')
      .replace(/tr\s*\(([^)]*)\)/g, '\\text{tr}($1)')
      // Convertir les exposants simples
      .replace(/\^(\w+)/g, '^{$1}')
      // Convertir les indices simples
      .replace(/_(\w+)/g, '_{$1}')
      // Convertir la multiplication par un point
      .replace(/\*/g, '\\cdot ')
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