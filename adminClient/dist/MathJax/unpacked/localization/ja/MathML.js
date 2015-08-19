/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/ja/MathML.js
 *
 *  Copyright (c) 2009-2015 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

MathJax.Localization.addTranslation("ja","MathML",{
        version: "2.5.0",
        isLoaded: true,
        strings: {
          BadMglyph: "\u8AA4\u3063\u305F mglyph: %1",
          BadMglyphFont: "\u8AA4\u3063\u305F\u30D5\u30A9\u30F3\u30C8: %1",
          MathPlayer: "MathJax \u306F MathPlayer \u3092\u8A2D\u5B9A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\n\nMathPlayer \u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3044\u306A\u3044\u5834\u5408\u306F\u3001\n\u307E\u305A\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002\n\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3044\u308B\u5834\u5408\u306F\u3001\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306E\u8A2D\u5B9A\u3067 ActiveX\n\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306E\u5B9F\u884C\u3092\u62D2\u5426\u3057\u3066\u3044\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\n[\u30C4\u30FC\u30EB] \u30E1\u30CB\u30E5\u30FC\u306E [\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8 \u30AA\u30D7\u30B7\u30E7\u30F3] \u3067\u3001\n[\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3] \u30BF\u30D6\u306E [\u30EC\u30D9\u30EB\u306E\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA] \u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n[Active \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306E\u5B9F\u884C] \u3068 [\u30D0\u30A4\u30CA\u30EA \u30D3\u30D8\u30A4\u30D3\u30A2\u30FC\u3068\u30B9\u30AF\u30EA\u30D7\u30C8\n\u30D3\u30D8\u30A4\u30D3\u30A2\u30FC] \u304C\u6709\u52B9\u306B\u306A\u3063\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\n\u73FE\u6642\u70B9\u3067\u306F\u3001\u6570\u5F0F\u304C\u7D44\u7248\u3055\u308C\u305A\u3001\u30A8\u30E9\u30FC \u30E1\u30C3\u30BB\u30FC\u30B8\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002",
          CantCreateXMLParser: "MathJax \u306F MathML \u7528\u306E XML \u30D1\u30FC\u30B5\u30FC\u3092\u4F5C\u6210\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\n\u300C\u30B9\u30AF\u30EA\u30D7\u30C8\u3092\u5B9F\u884C\u3057\u3066\u3082\u5B89\u5168\u3060\u3068\u30DE\u30FC\u30AF\u3055\u308C\u3066\u3044\u308B ActiveX\n\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306E\u30B9\u30AF\u30EA\u30D7\u30C8\u306E\u5B9F\u884C\u300D\u3092\u6709\u52B9\u306B\u3057\u3066\u3044\u308B\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\n([\u30C4\u30FC\u30EB] \u30E1\u30CB\u30E5\u30FC\u306E [\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8 \u30AA\u30D7\u30B7\u30E7\u30F3] \u3092\u9078\u629E\u3057\u3001\n[\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3] \u30BF\u30D6\u306E [\u30EC\u30D9\u30EB\u306E\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA] \u3067\u78BA\u8A8D\u3067\u304D\u307E\u3059)\u3002\n\nMathML \u306E\u6570\u5F0F\u3092 MathML \u304C\u51E6\u7406\u3067\u304D\u306A\u304F\u306A\u308A\u307E\u3059\u3002",
          UnknownNodeType: "\u4E0D\u660E\u306A\u7A2E\u985E\u306E\u30CE\u30FC\u30C9: %1",
          UnexpectedTextNode: "\u4E88\u671F\u3057\u306A\u3044\u30C6\u30AD\u30B9\u30C8 \u30CE\u30FC\u30C9: %1",
          ErrorParsingMathML: "MathML \u306E\u69CB\u6587\u89E3\u6790\u30A8\u30E9\u30FC",
          ParsingError: "MathML \u306E\u69CB\u6587\u89E3\u6790\u30A8\u30E9\u30FC: %1",
          MathMLSingleElement: "MathML \u306F\u5358\u4E00\u306E\u8981\u7D20\u3067\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044",
          MathMLRootElement: "MathML \u306F %1 \u3067\u306F\u306A\u304F \u003Cmath\u003E \u8981\u7D20\u3067\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044"
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/ja/MathML.js");
