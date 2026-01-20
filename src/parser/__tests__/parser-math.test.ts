import { MarkdownParser, DecorationRange } from '../../parser';

describe('MarkdownParser - Math', () => {
    let parser: MarkdownParser;

    beforeEach(async () => {
        parser = await MarkdownParser.create();
    });

    describe('inline math ($...$)', () => {
        it('should hide $ markers and style content', () => {
            const markdown = 'The equation $E = mc^2$ is famous.';
            const result = parser.extractDecorations(markdown);

            const hideDecs = result.filter((d: DecorationRange) => d.type === 'hide');
            const mathDecs = result.filter((d: DecorationRange) => d.type === 'inlineMath');

            expect(hideDecs.length).toBeGreaterThanOrEqual(2);
            expect(mathDecs.length).toBe(1);

            // The math content should be "E = mc^2" (positions 14-22)
            const mathDec = mathDecs[0];
            expect(mathDec).toBeDefined();
            expect(mathDec.startPos).toBe(14);  // After opening $
            expect(mathDec.endPos).toBe(22);    // Before closing $
        });

        it('should handle inline math at start of line', () => {
            const markdown = '$x = y$ text';
            const result = parser.extractDecorations(markdown);

            expect(result.some(d => d.type === 'inlineMath' && d.startPos === 1)).toBe(true);
            expect(result.some(d => d.type === 'hide' && d.startPos === 0)).toBe(true);
        });

        it('should handle inline math with Greek letters', () => {
            const markdown = '$\\alpha + \\beta = \\gamma$';
            const result = parser.extractDecorations(markdown);

            const mathDecs = result.filter(d => d.type === 'inlineMath');
            expect(mathDecs.length).toBe(1);
        });

        it('should handle multiple inline math in same line', () => {
            const markdown = '$a$ and $b$ are variables';
            const result = parser.extractDecorations(markdown);

            const mathDecs = result.filter(d => d.type === 'inlineMath');
            expect(mathDecs.length).toBe(2);
        });
    });

    describe('display math ($$...$$)', () => {
        it('should parse single-line $$ as inline math (remark-math v6 behavior)', () => {
            // Note: remark-math v6 parses single-line $$...$$ as inline math
            // Multi-line $$...$$ is required for display/block math
            const markdown = '$$\\int_0^\\infty e^{-x^2} dx$$';
            const result = parser.extractDecorations(markdown);

            // Single-line $$ is parsed as inline math in remark-math v6
            const inlineMathDecs = result.filter((d: DecorationRange) => d.type === 'inlineMath');
            expect(inlineMathDecs.length).toBe(1);
        });

        it('should handle multi-line display math', () => {
            const markdown = `$$
\\theta \\leftarrow \\theta - \\eta g_{t}
$$`;
            const result = parser.extractDecorations(markdown);

            const mathDecs = result.filter(d => d.type === 'displayMath');
            expect(mathDecs.length).toBe(1);
        });
    });

    describe('LaTeX display math (\\[...\\])', () => {
        it('should hide \\[ and \\] markers', () => {
            const markdown = '\\[\\theta \\leftarrow \\theta - \\eta\\]';
            const result = parser.extractDecorations(markdown);

            const hideDecs = result.filter((d: DecorationRange) => d.type === 'hide');
            const mathDecs = result.filter((d: DecorationRange) => d.type === 'displayMath');

            expect(hideDecs.length).toBeGreaterThanOrEqual(2);
            expect(mathDecs.length).toBe(1);
        });
    });

    describe('math edge cases', () => {
        it('should handle math with bold text nearby', () => {
            const markdown = '**bold** $x = y$ **more bold**';
            const result = parser.extractDecorations(markdown);

            expect(result.some(d => d.type === 'bold')).toBe(true);
            expect(result.some(d => d.type === 'inlineMath')).toBe(true);
        });
    });
});
