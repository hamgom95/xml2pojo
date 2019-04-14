const tape = require("tape");
const {parse} = require("./index");

const example = `
<?xml version="1.0" encoding="UTF-8"?>
<article xmlns="http://docbook.org/ns/docbook"
         xmlns:ns5="http://www.w3.org/1998/Math/MathML"
         xmlns:ns4="http://www.w3.org/1999/xhtml"
         xmlns:ns3="http://www.w3.org/2000/svg"
         xmlns:ns2="http://www.w3.org/1999/xlink"
         xmlns:ns="http://docbook.org/ns/docbook">
  <info>
    <title>My first docbook document</title>

    <author>
      <personname><firstname>Seth</firstname>
      <surname>Kenlon</surname></personname>
    </author>

    <publisher>
      <publishername>opensource.com</publishername>
    </publisher>

    <pubdate>2017</pubdate>
  </info>

  <section id="intro">
    <title>Introduction</title>

    <para>Introductory text goes here.</para>
  </section>

  <section id="body">
    <title>Section with a title</title>

    <para>Main body text goes here.</para>
  </section>

  <section id="conclusion">
    <title>Conclusion</title>

    <para>Exciting and inspiring conclusion goes here.</para>
  </section>
</article>
`;

console.log(parse(example));

tape("parse", (t) => {
    const res = parse(example);
    t.equal(res[0][0][0]["#text"], "My first docbook document");
    t.equal(res[0][1].id, "intro");
    t.end();
});