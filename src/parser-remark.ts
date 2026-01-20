// Helper module to handle ESM imports for remark
// This allows the parser to work in both CommonJS (VS Code) and ESM (Jest) contexts

let unified: any;
let remarkParse: any;
let remarkGfm: any;
let remarkMath: any;  // NEW: for math support
let visit: any;

export async function getRemarkProcessor() {
  if (!unified) {
    try {
      // Try CommonJS require first (for VS Code extension runtime)
      unified = require('unified').unified;
      remarkParse = require('remark-parse');
      remarkGfm = require('remark-gfm');
      remarkMath = require('remark-math');  // NEW
      visit = require('unist-util-visit').visit;
    } catch {
      // Fall back to ESM dynamic import (for Jest/testing)
      const unifiedModule = await import('unified');
      unified = unifiedModule.unified;
      remarkParse = await import('remark-parse');
      remarkGfm = await import('remark-gfm');
      remarkMath = await import('remark-math');  // NEW
      const visitModule = await import('unist-util-visit');
      visit = visitModule.visit;
    }
  }

  return {
    unified,
    remarkParse: remarkParse.default || remarkParse,
    remarkGfm: remarkGfm.default || remarkGfm,
    remarkMath: remarkMath.default || remarkMath,  // NEW
    visit,
  };
}

// Synchronous version for VS Code extension (uses require)
export function getRemarkProcessorSync() {
  if (!unified) {
    unified = require('unified').unified;
    remarkParse = require('remark-parse');
    remarkGfm = require('remark-gfm');
    remarkMath = require('remark-math');  // NEW
    visit = require('unist-util-visit').visit;
  }

  return {
    unified,
    remarkParse: remarkParse.default || remarkParse,
    remarkGfm: remarkGfm.default || remarkGfm,
    remarkMath: remarkMath.default || remarkMath,  // NEW
    visit,
  };
}
