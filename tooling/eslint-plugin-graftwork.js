/**
 * Graftwork's own lint rules for Tailwind class strings, which Stylelint cannot
 * see. They check every string in a className attribute and every string passed
 * to cn() or cva(), taken together.
 *
 * - no-outline-removal: outline-none/outline-hidden/outline-0 needs a replacement
 *   ring in the same expression (focus-ring, focus-visible:outline…,
 *   data-focus-visible:outline…)
 * - no-justified-text: text-justify
 * - no-px-font-size: text-[14px] and similar
 * - no-raw-colour: arbitrary colour values such as bg-[#fff] or text-[rgb(…)]
 */

const OUTLINE_REMOVED = /(^|\s)([\w-]+:)*outline-(none|hidden|0)(?=\s|$)/;
const OUTLINE_REPLACED = /(^|\s)(focus-ring(-within)?|([\w-]+:)*(focus-visible|data-focus-visible|has-focus-visible):outline-\S+)/;
const JUSTIFIED = /(^|\s)([\w-]+:)*text-justify(?=\s|$)/;
const PX_FONT = /(^|\s)([\w-]+:)*text-\[\d+(\.\d+)?px\]/;
const RAW_COLOUR = /(^|\s)([\w-]+:)*(bg|text|border|outline|ring|fill|stroke|decoration|from|to|via|shadow)-\[(#|rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color\()/i;

function collectStrings(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (node.type === "Literal" && typeof node.value === "string") out.push(node.value);
  if (node.type === "TemplateElement") out.push(node.value.cooked ?? "");
  for (const key of Object.keys(node)) {
    if (key === "parent") continue;
    const child = node[key];
    if (Array.isArray(child)) for (const c of child) collectStrings(c, out);
    else if (child && typeof child.type === "string") collectStrings(child, out);
  }
  return out;
}

function classRule(check) {
  return {
    meta: { type: "problem", schema: [], messages: { bad: check.message } },
    create(context) {
      const inspect = (node, target) => {
        const text = collectStrings(target).join(" ");
        if (check.test(text)) context.report({ node, messageId: "bad" });
      };
      return {
        JSXAttribute(node) {
          if (node.name?.name === "className" && node.value) inspect(node, node.value);
        },
        CallExpression(node) {
          const name = node.callee.type === "Identifier" ? node.callee.name : undefined;
          if (name === "cn" || name === "cva") inspect(node, { type: "Args", args: node.arguments });
        },
      };
    },
  };
}

export default {
  meta: { name: "eslint-plugin-graftwork" },
  rules: {
    "no-outline-removal": classRule({
      message:
        "Don't remove the outline without a replacement. Add focus-ring, or a focus-visible:/data-focus-visible: outline in the same class list.",
      test: (text) => OUTLINE_REMOVED.test(text) && !OUTLINE_REPLACED.test(text),
    }),
    "no-justified-text": classRule({ message: "Justified text is not allowed (WCAG 1.4.8).", test: (t) => JUSTIFIED.test(t) }),
    "no-px-font-size": classRule({
      message: "Font sizes must be in rem. Use a text-* token class instead of a px value.",
      test: (t) => PX_FONT.test(t),
    }),
    "no-raw-colour": classRule({
      message: "Raw colours are not allowed. Use a semantic token class such as text-text-default.",
      test: (t) => RAW_COLOUR.test(t),
    }),
  },
};
