// Resume layout — content lives entirely in data.yaml.
// Build: typst compile resume.typ resume.pdf  (or `make build`)
// Watch: typst watch resume.typ resume.pdf    (or `make watch`)

#set page(margin: (x: 1.3cm, y: 0.9cm))
#set text(font: "Times New Roman", size: 9.3pt)
#set par(leading: 0.58em, spacing: 0.5em)
#set list(spacing: 0.34em, indent: 0.4em)
#set block(spacing: 0.5em)
#show link: set text(fill: rgb("#0563C1"))

#let data = yaml("data.yaml")
#let profile = data.profile
#let experience = data.experience
#let projects = data.projects
#let activities = data.activities
#let skills = data.skills
#let education = data.education

// ---------------------------------------------------------------
// LAYOUT
// ---------------------------------------------------------------

#let sectionTitle(t) = [
  #v(0.35em)
  #line(length: 100%, stroke: 0.6pt)
  #text(weight: "bold", size: 10.5pt)[#t]
  #line(length: 100%, stroke: 0.6pt)
]

#let entryHeader(left, right) = [
  #grid(
    columns: (1fr, auto),
    text(weight: "bold")[#left], text(weight: "bold")[#right]
  )
]

#let bulletList(items) = [
  #for b in items [
    - #b
  ]
]

// Header
#align(center)[
  #text(size: 18pt, weight: "bold")[#profile.name]

  #text(size: 9.5pt)[
    #profile.location | #link("mailto:" + profile.email)[#profile.email] | #profile.phone
  ]

  #text(size: 9.5pt)[
    *Portfolio*: #link(profile.portfolio_url)[#profile.portfolio_text]  *GitHub*: #link(profile.github_url)[#profile.github_text]  *LinkedIn*: #link(profile.linkedin_url)[#profile.linkedin_text]
  ]
]

// Experience
#sectionTitle[Experience]
#for e in experience [
  #entryHeader([#e.title | #emph[#e.org]], [#e.date])
  #bulletList(e.bullets)
]

// Projects
#sectionTitle[Projects]
#for p in projects [
  #entryHeader([#p.name | #emph[#p.stack]], [#p.date])
  #bulletList(p.bullets)
]

// Activities
#sectionTitle[Activities]
#for a in activities [
  #entryHeader([#a.name | #emph[#a.role]], [#a.date])
  #bulletList(a.bullets)
]

// Skills
#sectionTitle[Skills]
#for s in skills [
  *#s.label*: #s.value \
]

// Education
#sectionTitle[Education]
#grid(
  columns: (1fr, 1fr),
  gutter: 1.5cm,
  ..education.map(ed => [
    *#ed.school* \
    #ed.date \
    #emph[#ed.program] \
    *Awards:*
    #bulletList(ed.awards)
  ])
)
