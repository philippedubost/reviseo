# Mathematical Formula Styling Guide

## Overview

The application now supports beautiful LaTeX formula rendering for mathematical expressions, formulas, limits, equations, and inequalities in both questions and answer options. This is powered by KaTeX for fast and accurate mathematical typesetting.

## Basic Usage

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

## Supported Mathematical Elements

### Basic Operations
- **Addition**: `$a + b$` → a + b
- **Subtraction**: `$a - b$` → a - b
- **Multiplication**: `$a \times b$` or `$a \cdot b$` → a × b or a · b
- **Division**: `$a \div b$` or `$\frac{a}{b}$` → a ÷ b or a/b

### Exponents and Subscripts
- **Superscript**: `$x^2$` → x²
- **Subscript**: `$x_1$` → x₁
- **Both**: `$x_1^2$` → x₁²

### Fractions
- **Simple fraction**: `$\frac{1}{2}$` → ½
- **Complex fraction**: `$\frac{x^2 + 1}{x - 1}$`
- **Nested fractions**: `$\frac{1}{\frac{1}{2}}$`

### Roots
- **Square root**: `$\sqrt{x}$` → √x
- **nth root**: `$\sqrt[3]{x}$` → ∛x
- **Complex roots**: `$\sqrt{x^2 + y^2}$`

### Limits
- **Basic limit**: `$\lim_{x \to 0} f(x)$`
- **Limit at infinity**: `$\lim_{x \to \infty} \frac{1}{x}$`
- **One-sided limits**: `$\lim_{x \to 0^+} f(x)$`

### Integrals
- **Indefinite integral**: `$\int f(x) dx$`
- **Definite integral**: `$\int_0^1 x^2 dx$`
- **Multiple integrals**: `$\iint f(x,y) dx dy$`

### Summations and Products
- **Summation**: `$\sum_{i=1}^n i$`
- **Product**: `$\prod_{i=1}^n i$`
- **Infinite series**: `$\sum_{n=0}^{\infty} \frac{1}{n!}$`

### Trigonometric Functions
- **Basic functions**: `$\sin(x)$`, `$\cos(x)$`, `$\tan(x)$`
- **Inverse functions**: `$\sin^{-1}(x)$`, `$\cos^{-1}(x)$`, `$\tan^{-1}(x)$`

### Logarithms
- **Natural log**: `$\ln(x)$`
- **Common log**: `$\log(x)$`
- **Log base**: `$\log_2(x)$`

### Greek Letters
- **Lowercase**: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\theta$`, `$\lambda$`, `$\mu$`, `$\pi$`, `$\sigma$`, `$\omega$`
- **Uppercase**: `$\Alpha$`, `$\Beta$`, `$\Gamma$`, `$\Delta$`, `$\Theta$`, `$\Lambda$`, `$\Sigma$`, `$\Omega$`

### Set Theory
- **Number sets**: `$\mathbb{N}$`, `$\mathbb{Z}$`, `$\mathbb{Q}$`, `$\mathbb{R}$`, `$\mathbb{C}$`
- **Set operations**: `$A \cup B$`, `$A \cap B$`, `$A \setminus B$`
- **Membership**: `$x \in A$`, `$x \notin A$`

### Inequalities
- **Less than**: `$x < y$`
- **Less than or equal**: `$x \leq y$` or `$x \le y$`
- **Greater than**: `$x > y$`
- **Greater than or equal**: `$x \geq y$` or `$x \ge y$`
- **Not equal**: `$x \neq y$`
- **Approximately equal**: `$x \approx y$`

### Logical Operators
- **And**: `$\land$` or `$\wedge$`
- **Or**: `$\lor$` or `$\vee$`
- **Not**: `$\neg$`
- **Implies**: `$\Rightarrow$`
- **If and only if**: `$\Leftrightarrow$`

### Matrices
```latex
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}$$
```

### Systems of Equations
```latex
$$\begin{cases}
x + y = 5 \\
x - y = 1
\end{cases}$$
```

## Example Usage in Questions

### Question Examples

1. **Algebra Question**:
   ```
   Solve for $x$: $2x + 3 = 7$
   ```

2. **Calculus Question**:
   ```
   Find the derivative of $f(x) = x^3 + 2x^2 - 5x + 1$
   ```

3. **Limit Question**:
   ```
   Calculate: $$\lim_{x \to 0} \frac{\sin(x)}{x}$$
   ```

4. **Inequality Question**:
   ```
   Solve the inequality: $x^2 - 5x + 6 \geq 0$
   ```

### Answer Options Examples

1. **Multiple Choice with Fractions**:
   ```
   Options: ["$\frac{1}{2}$", "$\frac{3}{4}$", "$\frac{2}{3}$", "$\frac{5}{6}$"]
   ```

2. **Equations as Options**:
   ```
   Options: ["$x = 2$", "$x = -1$", "$x = 3$", "$x = 0$"]
   ```

3. **Complex Expressions**:
   ```
   Options: ["$\sqrt{2}$", "$\frac{\sqrt{3}}{2}$", "$\pi$", "$e$"]
   ```

## Advanced Features

### Custom Macros
The system includes predefined macros for common symbols:
- `\R` for real numbers (`$\mathbb{R}$`)
- `\N` for natural numbers (`$\mathbb{N}$`)
- `\Z` for integers (`$\mathbb{Z}$`)
- `\Q` for rational numbers (`$\mathbb{Q}$`)
- `\C` for complex numbers (`$\mathbb{C}$`)

### Error Handling
If LaTeX syntax is invalid, the system will:
1. Display the original text with error styling
2. Log a warning in the console
3. Provide a tooltip indicating the error

### Responsive Design
Mathematical formulas automatically adjust their size based on screen size:
- Mobile devices: Smaller font size for better readability
- Desktop: Larger font size for better visibility

## Best Practices

1. **Use Display Math for Complex Expressions**: Use `$$...$$` for equations that should be centered and prominent
2. **Keep Inline Math Simple**: Use `$...$` for simple expressions within text
3. **Test Your Formulas**: Verify that your LaTeX syntax is correct before using it
4. **Use Semantic Markup**: Use appropriate commands like `\frac{}{}` instead of `/` for fractions
5. **Consider Mobile Users**: Complex formulas may be harder to read on small screens

## Color Scheme
The math renderer uses your application's color scheme:
- **Standard text**: Foreground color
- **Operators** (+, -, ×, ÷): Blue accent color
- **Relations** (=, <, >, ≤, ≥): Green accent color
- **Functions** (sin, cos, log): Blue accent color
- **Delimiters** (parentheses, brackets): Green accent color
- **Special sets** (ℝ, ℕ, ℤ): Green accent color

## Troubleshooting

### Common Issues
1. **Formula not rendering**: Check for proper `$` delimiters
2. **Red error text**: Invalid LaTeX syntax, check your commands
3. **Spacing issues**: Use `\,` for thin space, `\;` for medium space, `\quad` for large space

### Getting Help
- Check the console for error messages
- Verify LaTeX syntax using online LaTeX editors
- Ensure proper escaping of special characters

## Examples by Subject

### Algebra
- Quadratic formula: `$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`
- Factoring: `$(x + 3)(x - 2) = x^2 + x - 6$`

### Calculus
- Derivative: `$\frac{d}{dx}[x^n] = nx^{n-1}$`
- Integral: `$\int x^n dx = \frac{x^{n+1}}{n+1} + C$`

### Statistics
- Normal distribution: `$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$`
- Standard deviation: `$\sigma = \sqrt{\frac{\sum(x_i - \mu)^2}{n}}$`

### Geometry
- Pythagorean theorem: `$a^2 + b^2 = c^2$`
- Area of circle: `$A = \pi r^2$`

### Physics
- Einstein's equation: `$E = mc^2$`
- Kinetic energy: `$KE = \frac{1}{2}mv^2$`

This mathematical formula styling system makes your educational content more professional and easier to understand, especially for STEM subjects.