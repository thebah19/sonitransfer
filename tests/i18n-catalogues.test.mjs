import assert from "node:assert/strict";
import test from "node:test";
import { en } from "../src/i18n/en.js";
import { fr } from "../src/i18n/fr.js";
import { es } from "../src/i18n/es.js";

const translations = { fr, es };

// `en.legal.governing` is empty on purpose: the English site does not need to
// say that its legal documents are published in English.
const allowedEmpty = new Set(["legal.governing"]);

function walk(value, path, visit) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => walk(child, path ? `${path}.${key}` : key, visit));
    return;
  }
  visit(value, path);
}

function shapeOf(catalogue) {
  const shape = new Map();
  walk(catalogue, "", (value, path) => shape.set(path, typeof value));
  return shape;
}

function valueAt(catalogue, path) {
  return path
    .split(/\.|\[|\]/)
    .filter(Boolean)
    .reduce((node, key) => node?.[key], catalogue);
}

const englishShape = shapeOf(en);

for (const [locale, catalogue] of Object.entries(translations)) {
  test(`${locale}: every English key exists with the same shape`, () => {
    const shape = shapeOf(catalogue);
    const missing = [...englishShape.keys()].filter((key) => !shape.has(key));
    assert.deepEqual(missing, [], `${locale} is missing: ${missing.join(", ")}`);

    const wrongType = [...englishShape.entries()]
      .filter(([key, type]) => shape.get(key) !== type)
      .map(([key]) => key);
    assert.deepEqual(wrongType, [], `${locale} has the wrong type at: ${wrongType.join(", ")}`);
  });

  test(`${locale}: has no keys English does not have`, () => {
    const extra = [...shapeOf(catalogue).keys()].filter((key) => !englishShape.has(key));
    assert.deepEqual(extra, [], `${locale} has unexpected keys: ${extra.join(", ")}`);
  });

  test(`${locale}: no string is left empty`, () => {
    const empty = [];
    walk(catalogue, "", (value, path) => {
      if (typeof value === "string" && value.trim() === "" && !allowedEmpty.has(path)) empty.push(path);
    });
    assert.deepEqual(empty, [], `${locale} has empty strings at: ${empty.join(", ")}`);
  });

  test(`${locale}: no long string was left untranslated by accident`, () => {
    // Brand names, regulator names, document titles and the Family Fun Day's
    // own name are meant to read the same in every language.
    const intentionallyShared = [
      /^legalLinks\./,
      /^footer\.compliance$/,
      /^hero\.proof\[2\]\[1\]$/,
      /^communityPage\.funDayEyebrow$/,
      /^meta\.contact\.title$/,
    ];
    const shared = [];
    walk(en, "", (value, path) => {
      if (typeof value !== "string" || value.length < 16) return;
      if (intentionallyShared.some((pattern) => pattern.test(path))) return;
      if (valueAt(catalogue, path) === value) shared.push(path);
    });
    assert.deepEqual(shared, [], `${locale} still matches English at: ${shared.join(", ")}`);
  });

  test(`${locale}: the payout lookup is keyed the same way as English`, () => {
    assert.deepEqual(Object.keys(catalogue.payoutMethods).sort(), Object.keys(en.payoutMethods).sort());
  });

  test(`${locale}: the exact-amount note keeps its {method} placeholder`, () => {
    assert.ok(
      catalogue.calculator.exactNote.includes("{method}"),
      `${locale} calculator.exactNote must contain {method}`,
    );
  });

  test(`${locale}: covers every calculator error code`, () => {
    assert.deepEqual(Object.keys(catalogue.calculator.errors).sort(), Object.keys(en.calculator.errors).sort());
  });
}

test("every locale describes the same CSR stories", () => {
  const slugs = Object.keys(en.stories).sort();
  assert.equal(slugs.length, 3);

  for (const [locale, catalogue] of Object.entries(translations)) {
    assert.deepEqual(Object.keys(catalogue.stories).sort(), slugs, `${locale} story slugs differ`);

    for (const slug of slugs) {
      assert.equal(
        catalogue.stories[slug].gallery.length,
        en.stories[slug].gallery.length,
        `${locale}/${slug} has a different number of gallery captions`,
      );
      assert.equal(
        catalogue.stories[slug].paragraphs.length,
        en.stories[slug].paragraphs.length,
        `${locale}/${slug} has a different number of paragraphs`,
      );
    }
  }
});
