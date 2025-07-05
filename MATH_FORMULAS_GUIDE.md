# Mathematical Formula Styling Guide

## Overview

The application now supports beautiful LaTeX formula rendering for mathematical expressions, formulas, limits, equations, and inequalities in both questions and answer options. This is powered by KaTeX for fast and accurate mathematical typesetting.

## ✨ **NEW: Automatic Math Detection**

The system now automatically detects and formats mathematical expressions **without requiring explicit LaTeX delimiters**! This means you can write natural mathematical expressions and they'll be automatically converted to beautiful LaTeX formatting.

### Examples of Automatic Detection:

| Input | Output |
|-------|--------|
| `F(x) = 3x` | Rendered as LaTeX: F(x) = 3x |
| `y = 2x^2 + 1` | Rendered as LaTeX: y = 2x² + 1 |
| `sin(x) = 0.5` | Rendered as LaTeX: sin(x) = 0.5 |
| `x <= 5` | Rendered as LaTeX: x ≤ 5 |
| `y = 1/2` | Rendered as LaTeX: y = ½ |

### What Gets Automatically Detected:

✅ **Function notation**: `F(x)`, `g(y)`, `sin(x)`, `cos(x)`, `tan(x)`, `log(x)`  
✅ **Equations**: `x = 2y + 1`, `a = 3b`, `y = x^2`  
✅ **Inequalities**: `x <= 5`, `y >= 10`, `a != b`  
✅ **Fractions**: `1/2`, `3/4`, `a/b`  
✅ **Exponents**: `x^2`, `y^3`, `a^n`  
✅ **Coefficients**: `3x`, `2y`, `5a`  
✅ **Mathematical operators**: `*`, `×`, `÷`  
✅ **Greek letters**: `pi`, `alpha`, `beta`, `gamma`, `delta`, `theta`, `lambda`, `mu`, `sigma`, `phi`, `omega`  
✅ **Special symbols**: `infinity`, `√`  

### What Does NOT Get Detected:

❌ **Regular text**: "Simple text without math"  
❌ **Numbers in context**: "I have 3 apples", "Page 2 of 10"  
❌ **Time references**: "Call me at 5pm"  
❌ **General words**: "The quick brown fox"  

## Manual LaTeX (Still Supported)

You can still use explicit LaTeX delimiters for complex expressions:

### Inline Math
Use single dollar signs `$...$` for inline mathematical expressions:
```
What is the result of $x^2 + 2x + 1$?
```

### Display Math
Use double dollar signs `$$...$$` for centered display equations:
```
Solve the equation: $$x^2 + 2x + 1 = 0$$
```

## Usage Examples

### ✨ **NEW: Simple Natural Input**

Just write mathematical expressions naturally:

```javascript
// Question examples - no $ delimiters needed!
{
  "question": "Find the value of x when F(x) = 3x equals 15",
  "options": ["x = 5", "x = 3", "x = 15", "x = 45"],
  "correctAnswer": "x = 5"
}

{
  "question": "What is the derivative of y = x^2 + 3x?",
  "options": ["y' = 2x + 3", "y' = x + 3", "y' = 2x^2", "y' = 3x"],
  "correctAnswer": "y' = 2x + 3"
}

{
  "question": "Solve the inequality: x <= 10",
  "options": ["x ≤ 10", "x ≥ 10", "x < 10", "x > 10"],
  "correctAnswer": "x ≤ 10"
}
```

### Traditional LaTeX (For Complex Expressions)

For complex mathematical expressions, you can still use explicit LaTeX:

```javascript
{
  "question": "Calculate the limit: $$\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$$",
  "options": ["$0$", "$1$", "$\\infty$", "Does not exist"],
  "correctAnswer": "$1$"
}
```

## Supported Mathematical Elements

### Basic Operations
- **Addition**: `a + b` → a + b
- **Subtraction**: `a - b` → a - b
- **Multiplication**: `a * b` or `a × b` → a · b or a × b
- **Division**: `a / b` or `a ÷ b` → a/b or a ÷ b

### Functions
- **Linear**: `F(x) = 3x` → F(x) = 3x
- **Quadratic**: `g(x) = x^2 + 2x + 1` → g(x) = x² + 2x + 1
- **Trigonometric**: `sin(x) = 0.5` → sin(x) = 0.5

### Equations and Inequalities
- **Equations**: `x = 2y + 1` → x = 2y + 1
- **Less than or equal**: `x <= 5` → x ≤ 5
- **Greater than or equal**: `y >= 10` → y ≥ 10
- **Not equal**: `a != b` → a ≠ b

### Fractions and Exponents
- **Fractions**: `1/2`, `3/4` → ½, ¾
- **Exponents**: `x^2`, `y^3` → x², y³
- **Coefficients**: `3x`, `2y` → 3x, 2y

### Advanced Features (Explicit LaTeX)
- **Limits**: `$\lim_{x \to 0} f(x)$`
- **Integrals**: `$\int f(x) dx$`
- **Summations**: `$\sum_{i=1}^n i$`
- **Matrices**: `$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$`

## Real-World Examples

### Algebra Course
```javascript
{
  "question": "Solve for x: 2x + 5 = 15",
  "options": ["x = 5", "x = 10", "x = 3", "x = 7"],
  "correctAnswer": "x = 5"
}
```

### Calculus Course
```javascript
{
  "question": "Find f'(x) if f(x) = x^3 + 2x^2 - 5x + 1",
  "options": ["f'(x) = 3x^2 + 4x - 5", "f'(x) = 3x^2 + 4x + 5", "f'(x) = x^2 + 4x - 5"],
  "correctAnswer": "f'(x) = 3x^2 + 4x - 5"
}
```

### Physics Course
```javascript
{
  "question": "Einstein's mass-energy equation is:",
  "options": ["E = mc^2", "E = 1/2 mv^2", "E = mgh", "E = Fd"],
  "correctAnswer": "E = mc^2"
}
```

### Geometry Course
```javascript
{
  "question": "The area of a circle with radius r is:",
  "options": ["A = pi r^2", "A = 2 pi r", "A = pi d", "A = r^2"],
  "correctAnswer": "A = pi r^2"
}
```

## Best Practices

1. **Write Naturally**: Just type mathematical expressions as you would normally write them
2. **Use Explicit LaTeX for Complex Expressions**: For advanced mathematics, use `$...$` or `$$...$$`
3. **Test Your Expressions**: Verify that your mathematical expressions render correctly
4. **Be Consistent**: Use the same notation style throughout your questions

## Troubleshooting

### Common Issues
1. **Expression not rendering**: Check if it matches the supported patterns
2. **Partial rendering**: Some complex expressions may need explicit LaTeX delimiters
3. **False positives**: Very rare, but if regular text is being formatted as math, use different wording

### Getting Help
- Check the browser console for any math rendering errors
- Test expressions in isolation to identify issues
- Use explicit LaTeX syntax for complex expressions

## Color Scheme
The math renderer uses your application's color scheme:
- **Standard text**: Foreground color
- **Operators** (+, -, ×, ÷): Blue accent color
- **Relations** (=, <, >, ≤, ≥): Green accent color
- **Functions** (sin, cos, log): Blue accent color
- **Delimiters** (parentheses, brackets): Green accent color
- **Special sets** (ℝ, ℕ, ℤ): Green accent color

## Summary

✅ **Automatic Detection**: No need for LaTeX delimiters in most cases  
✅ **Natural Input**: Write `F(x) = 3x` instead of `$F(x) = 3x$`  
✅ **Backward Compatible**: Explicit LaTeX still works for complex expressions  
✅ **Smart Detection**: Avoids formatting regular text as math  
✅ **Beautiful Rendering**: Professional mathematical typography  
✅ **Dark Theme**: Integrated with your app's color scheme  
✅ **Responsive**: Works on both desktop and mobile  

This enhanced mathematical formula styling system makes your educational content more professional and easier to create, especially for STEM subjects!