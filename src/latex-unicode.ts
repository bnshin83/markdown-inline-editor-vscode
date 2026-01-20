// LaTeX to Unicode mapping for common mathematical symbols
// Used by the parser to convert LaTeX commands to Unicode characters

/**
 * Mapping of LaTeX commands to their Unicode equivalents.
 * This includes Greek letters, operators, and common mathematical symbols.
 */
export const LATEX_TO_UNICODE: Record<string, string> = {
    // Greek lowercase
    '\\alpha': 'α',
    '\\beta': 'β',
    '\\gamma': 'γ',
    '\\delta': 'δ',
    '\\epsilon': 'ε',
    '\\varepsilon': 'ε',
    '\\zeta': 'ζ',
    '\\eta': 'η',
    '\\theta': 'θ',
    '\\vartheta': 'ϑ',
    '\\iota': 'ι',
    '\\kappa': 'κ',
    '\\lambda': 'λ',
    '\\mu': 'μ',
    '\\nu': 'ν',
    '\\xi': 'ξ',
    '\\pi': 'π',
    '\\varpi': 'ϖ',
    '\\rho': 'ρ',
    '\\varrho': 'ϱ',
    '\\sigma': 'σ',
    '\\varsigma': 'ς',
    '\\tau': 'τ',
    '\\upsilon': 'υ',
    '\\phi': 'φ',
    '\\varphi': 'ϕ',
    '\\chi': 'χ',
    '\\psi': 'ψ',
    '\\omega': 'ω',

    // Greek uppercase
    '\\Gamma': 'Γ',
    '\\Delta': 'Δ',
    '\\Theta': 'Θ',
    '\\Lambda': 'Λ',
    '\\Xi': 'Ξ',
    '\\Pi': 'Π',
    '\\Sigma': 'Σ',
    '\\Upsilon': 'Υ',
    '\\Phi': 'Φ',
    '\\Psi': 'Ψ',
    '\\Omega': 'Ω',

    // Operators
    '\\cdot': '·',
    '\\times': '×',
    '\\div': '÷',
    '\\pm': '±',
    '\\mp': '∓',
    '\\leq': '≤',
    '\\le': '≤',
    '\\geq': '≥',
    '\\ge': '≥',
    '\\neq': '≠',
    '\\ne': '≠',
    '\\approx': '≈',
    '\\equiv': '≡',
    '\\sim': '∼',
    '\\simeq': '≃',
    '\\propto': '∝',

    // Arrows
    '\\leftarrow': '←',
    '\\rightarrow': '→',
    '\\leftrightarrow': '↔',
    '\\Leftarrow': '⇐',
    '\\Rightarrow': '⇒',
    '\\Leftrightarrow': '⇔',
    '\\uparrow': '↑',
    '\\downarrow': '↓',
    '\\mapsto': '↦',

    // Set/Logic
    '\\forall': '∀',
    '\\exists': '∃',
    '\\nexists': '∄',
    '\\in': '∈',
    '\\notin': '∉',
    '\\ni': '∋',
    '\\subset': '⊂',
    '\\supset': '⊃',
    '\\subseteq': '⊆',
    '\\supseteq': '⊇',
    '\\cup': '∪',
    '\\cap': '∩',
    '\\emptyset': '∅',
    '\\varnothing': '∅',

    // Calculus/Analysis
    '\\infty': '∞',
    '\\partial': '∂',
    '\\nabla': '∇',
    '\\int': '∫',
    '\\iint': '∬',
    '\\iiint': '∭',
    '\\oint': '∮',
    '\\sum': '∑',
    '\\prod': '∏',
    '\\coprod': '∐',

    // Other
    '\\sqrt': '√',
    '\\circ': '∘',
    '\\bullet': '•',
    '\\star': '★',
    '\\dagger': '†',
    '\\ddagger': '‡',
    '\\ell': 'ℓ',
    '\\hbar': 'ℏ',
    '\\prime': '′',
    '\\angle': '∠',
    '\\perp': '⊥',
    '\\parallel': '∥',

    // Spacing (convert to single space or nothing)
    '\\quad': ' ',
    '\\qquad': '  ',
    '\\,': ' ',
    '\\;': ' ',
    '\\:': ' ',
    '\\!': '',

    // Accents (simplified - just show base character with combining character)
    '\\hat': '̂',  // combining circumflex
    '\\tilde': '̃', // combining tilde
    '\\bar': '̄',  // combining macron
    '\\dot': '̇',  // combining dot above
    '\\ddot': '̈', // combining diaeresis
    '\\vec': '⃗',  // combining right arrow above

    // Additional operators (from paper)
    '\\to': '→',
    '\\ll': '≪',
    '\\gg': '≫',
    '\\mid': '|',
    '\\top': '⊤',
    '\\bot': '⊥',
    '\\square': '□',
    '\\ldots': '…',
    '\\cdots': '⋯',
    '\\vdots': '⋮',
    '\\ddots': '⋱',

    // Function names (keep as text, these get styled by math mode)
    '\\max': 'max',
    '\\min': 'min',
    '\\log': 'log',
    '\\exp': 'exp',
    '\\sin': 'sin',
    '\\cos': 'cos',
    '\\tan': 'tan',
    '\\lim': 'lim',
    '\\sup': 'sup',
    '\\inf': 'inf',
    '\\arg': 'arg',

    // Additional comparison operators
    '\\lesssim': '≲',
    '\\gtrsim': '≳',
    '\\lessapprox': '⪅',
    '\\gtrapprox': '⪆',
    '\\prec': '≺',
    '\\succ': '≻',
    '\\preceq': '⪯',
    '\\succeq': '⪰',
    '\\neg': '¬',
    '\\land': '∧',
    '\\lor': '∨',
};

/**
 * Interface for a LaTeX symbol replacement.
 */
export interface LatexReplacement {
    startPos: number;
    endPos: number;
    latex: string;
    unicode: string;
}

/**
 * Find all LaTeX commands in a string and return their positions and replacements.
 * @param text The text to search
 * @param startOffset Offset to add to positions (for use within larger text)
 * @returns Array of replacements
 */
export function findLatexCommands(text: string, startOffset: number = 0): LatexReplacement[] {
    const replacements: LatexReplacement[] = [];

    // Match LaTeX commands: backslash followed by letters, optionally followed by {content}
    const commandRegex = /\\([a-zA-Z]+)(?:\{([^}]*)\})?/g;
    let match;

    // Mappings for special font commands
    const mathcalMap: Record<string, string> = {
        'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
        'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
        'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
        'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
    };

    const mathbbMap: Record<string, string> = {
        'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾',
        'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ',
        'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌',
        'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
    };

    while ((match = commandRegex.exec(text)) !== null) {
        const fullMatch = match[0];
        const command = '\\' + match[1];
        const bracedContent = match[2];

        // Handle special font commands
        if (command === '\\mathcal' && bracedContent) {
            const converted = bracedContent.split('').map(c => mathcalMap[c] || c).join('');
            replacements.push({
                startPos: startOffset + match.index,
                endPos: startOffset + match.index + fullMatch.length,
                latex: fullMatch,
                unicode: converted,
            });
            continue;
        }

        if (command === '\\mathbb' && bracedContent) {
            const converted = bracedContent.split('').map(c => mathbbMap[c] || c).join('');
            replacements.push({
                startPos: startOffset + match.index,
                endPos: startOffset + match.index + fullMatch.length,
                latex: fullMatch,
                unicode: converted,
            });
            continue;
        }

        // Handle \text{...} - just show the text content
        if (command === '\\text' && bracedContent) {
            replacements.push({
                startPos: startOffset + match.index,
                endPos: startOffset + match.index + fullMatch.length,
                latex: fullMatch,
                unicode: bracedContent,
            });
            continue;
        }

        // Handle \sqrt{x} → √x
        if (command === '\\sqrt' && bracedContent) {
            replacements.push({
                startPos: startOffset + match.index,
                endPos: startOffset + match.index + fullMatch.length,
                latex: fullMatch,
                unicode: '√' + bracedContent,
            });
            continue;
        }

        // Check if this command has a Unicode equivalent
        const unicode = LATEX_TO_UNICODE[command];
        if (unicode) {
            // For commands like \tilde{x}, we want to show x̃
            if (bracedContent !== undefined) {
                // It's an accent command with braced content
                if (command === '\\tilde' || command === '\\hat' || command === '\\bar' ||
                    command === '\\dot' || command === '\\ddot' || command === '\\vec') {
                    replacements.push({
                        startPos: startOffset + match.index,
                        endPos: startOffset + match.index + fullMatch.length,
                        latex: fullMatch,
                        unicode: bracedContent + unicode, // e.g., "u" + combining tilde
                    });
                }
            } else {
                // Simple command like \theta
                replacements.push({
                    startPos: startOffset + match.index,
                    endPos: startOffset + match.index + fullMatch.length,
                    latex: fullMatch,
                    unicode: unicode,
                });
            }
        }
    }

    // Also handle subscripts and superscripts
    const subSupRegex = /([_^])\{([^}]+)\}|([_^])([a-zA-Z0-9])/g;
    while ((match = subSupRegex.exec(text)) !== null) {
        const fullMatch = match[0];
        const marker = match[1] || match[3]; // _ or ^
        const content = match[2] || match[4]; // content

        let unicode = '';
        if (marker === '_') {
            // Subscript
            unicode = toSubscript(content);
        } else {
            // Superscript  
            unicode = toSuperscript(content);
        }

        if (unicode && unicode !== content) {
            replacements.push({
                startPos: startOffset + match.index,
                endPos: startOffset + match.index + fullMatch.length,
                latex: fullMatch,
                unicode: unicode,
            });
        }
    }

    // Handle \frac{numerator}{denominator} → numerator/denominator
    const fracRegex = /\\frac\{([^}]*)\}\{([^}]*)\}/g;
    while ((match = fracRegex.exec(text)) !== null) {
        const fullMatch = match[0];
        const numerator = match[1];
        const denominator = match[2];

        replacements.push({
            startPos: startOffset + match.index,
            endPos: startOffset + match.index + fullMatch.length,
            latex: fullMatch,
            unicode: numerator + '/' + denominator,
        });
    }

    return replacements;
}

/**
 * Convert a string to Unicode subscript where possible.
 */
function toSubscript(text: string): string {
    const subscriptMap: Record<string, string> = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
        'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
        'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
        'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
        'v': 'ᵥ', 'x': 'ₓ',
        '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
    };

    return text.split('').map(c => subscriptMap[c] || c).join('');
}

/**
 * Convert a string to Unicode superscript where possible.
 */
function toSuperscript(text: string): string {
    const superscriptMap: Record<string, string> = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
        'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
        'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
        'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
        'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    };

    return text.split('').map(c => superscriptMap[c] || c).join('');
}
