/* ZweiFach, project data (shared by Case Study + Our Work) */
window.ZF_PROJECTS = {
  order: ["bellevue", "rothruthi", "seeblick", "niederrohrdorf", "buero"],
  items: {
    bellevue: {
      slug: "bellevue",
      name: "Bellevue Wynental",
      place: "Burg AG · Wynental",
      year: "2025",
      program: "New build · 4 apartments",
      status: "On the market",
      strand: "both",
      tagline: "Four apartments above the valley, drawn to be sold, sold on the drawings.",
      hero: "assets/projects/bellevue/ext-1.jpg",
      context: "A multi-family house on a hillside plot in Burg, looking down the Wynental. The brief was double from day one: a building the commune would permit, and a set of four apartments a bank would count as pre-sellable.",
      design: "Two full floors and an attic level, each apartment oriented to the valley. One design produced two document sets: clean sales floor plans for buyers, and the full technical set, site plan and elevations, for the permit and the build.",
      commercial: "Pre-sales ran on plans and photoreal visuals before groundworks. The sales documentation and reservation flow were produced by the same studio that drew the plans.",
      figures: [
        { value: "4", label: "Apartments" },
        { value: "3", label: "Levels" },
        { value: "2025", label: "On the market" }
      ],
      images: [
        { src: "assets/projects/bellevue/ext-1.jpg", cap: "Street elevation at dusk" },
        { src: "assets/projects/bellevue/ext-2.jpg", cap: "Garden side" },
        { src: "assets/projects/bellevue/int-1.jpg", cap: "Apartment 1, living" },
        { src: "assets/projects/bellevue/int-2.jpg", cap: "Attic apartment" },
        { src: "assets/projects/bellevue/ext-3.jpg", cap: "Valley approach" },
        { src: "assets/projects/bellevue/night-1.jpg", cap: "Light study" }
      ],
      plans: [
        { src: "assets/projects/bellevue/plans/eg.png", label: "Ground floor", set: "Sales floor plan", bg: "assets/projects/bellevue/renders/r-eg.jpg", cap: "Wohnung 1, garden seat", m2: "101 m²", note: "A single-level 4.5 room home opening to a private garden seat. The day zone is pulled to the valley, services held to the core, no corridor waste." },
        { src: "assets/projects/bellevue/plans/eg-detail.png", label: "Living, in detail", set: "Sales floor plan", bg: "assets/projects/bellevue/renders/r-eg-detail.jpg", cap: "The open day zone", m2: "43 m²", note: "A closer read of Wohnung 1: a 43 m² living, dining and kitchen in one span, the island facing the room and the whole zone opening onto the Sitzplatz. This is the moment that sells the plan." },
        { src: "assets/projects/bellevue/plans/og.png", label: "Upper floor", set: "Sales floor plan", bg: "assets/projects/bellevue/renders/r-og.jpg", cap: "Wohnungen 2 and 3, balcony", m2: "141 to 158 m²", note: "Two apartments per upper floor, each with a balcony over the Wynental and a clear day and night split a buyer reads in seconds." },
        { src: "assets/projects/bellevue/plans/attika.png", label: "Attic", set: "Sales floor plan", bg: "assets/projects/bellevue/renders/r-attika.jpg", cap: "Wohnung 4, wrap terrace", m2: "174 m²", note: "The attic apartment, held under the height datum and wrapped by a 148 m² terrace. The premium unit that anchors the price ladder." },
        { src: "assets/projects/bellevue/plans/site.png", label: "Site plan", set: "Technical set", bg: "assets/projects/bellevue/renders/r-site.jpg", cap: "Site plan, planting and access", m2: "1:200", note: "Plot boundaries, the planting palette, parking and the protected tree in one approved sheet. This is what the commune signs off." },
        { src: "assets/projects/bellevue/plans/roof.png", label: "Roof plan", set: "Technical set", bg: "assets/projects/bellevue/renders/r-roof.jpg", cap: "Roof plan and drainage", m2: "1:100", note: "The flat-roof build-up, drainage falls and the terrace layout, the detail the bank's surveyor and the builder both check." },
        { src: "assets/projects/bellevue/plans/elev-sw.png", label: "Elevations SW", set: "Technical set", bg: "assets/projects/bellevue/renders/r-elev-sw.jpg", cap: "Elevations, south and west", m2: "1:100", note: "South and west elevations set the window rhythm, balcony lines and material bands the visuals are then built from." },
        { src: "assets/projects/bellevue/plans/elev-no.png", label: "Elevations NE", set: "Technical set", bg: "assets/projects/bellevue/renders/r-elev-no.jpg", cap: "Elevations, north and east", m2: "1:100", note: "North and east elevations, the street-facing volume kept under the height datum so the permit runs without objection." }
      ],
      chain: [
        { kind: "esad", title: "The plot and the brief", text: "A hillside parcel in Burg and an owner who wanted a project a bank would follow.", proof: "Autumn 2024" },
        { kind: "esad", title: "Feasibility and strategic planning", text: "Density, orientation and cost frame tested until the numbers held.", proof: "6 weeks" },
        { kind: "esad", title: "Design and building permit", text: "Four apartments drawn for the slope and the light. Permit filed and obtained without objections.", proof: "Permit in 7 months" },
        { kind: "dionis", title: "Priced and structured for pre-sale", text: "A price ladder per unit, photoreal visuals for the campaign, and a financing check for every serious buyer.", proof: "From CHF 740,000" },
        { kind: "gate", title: "44% reserved on plans", text: "Enough pre-sales for the bank to release the construction credit. The project was financed before it was built.", proof: "November 2025" },
        { kind: "both", title: "Execution plans and the last units", text: "Execution plans handed to the site managers, sales continuing on plans through to delivery.", proof: "Delivery 2027" }
      ],
      chainNote: "Dates and pre-sale figures are indicative placeholders, to be replaced.",
      result: ["44% reserved before groundbreaking", "Construction credit released", "From CHF 740,000, units remaining", "Delivery 2027"],
      resultBg: "assets/projects/bellevue/renders/r-result.jpg",
      next: "rothruthi"
    },
    rothruthi: {
      slug: "rothruthi",
      name: "Rothrüthi",
      place: "Aargau",
      year: "2025",
      program: "New build · 13 apartments",
      status: "Selling",
      strand: "both",
      tagline: "Thirteen units, one repeating plan logic, efficiency a bank can read.",
      hero: "assets/projects/rothruthi/ext-1.jpg",
      context: "A larger programme: thirteen apartments across stacked, repeating floor plates. At this scale the financing gate is unforgiving, the pre-sale rate decides when the cranes arrive.",
      design: "Three apartment types repeat over three levels, so one drawn plan sells nine units. Repetition kept construction cost legible to the bank; variation lives in the corner units and the attic.",
      commercial: "The unit mix was tuned before the building permit, sizes matched to what the local market absorbs off-plan. Marketing runs on transparent floor plans over photoreal renders.",
      figures: [
        { value: "13", label: "Apartments" },
        { value: "3", label: "Repeating types" },
        { value: "2025", label: "Selling" }
      ],
      images: [
        { src: "assets/projects/rothruthi/ext-1.jpg", cap: "Arrival side" },
        { src: "assets/projects/rothruthi/ext-2.jpg", cap: "South façade" },
        { src: "assets/projects/rothruthi/int-1.jpg", cap: "Type 2, living" },
        { src: "assets/projects/rothruthi/int-2.jpg", cap: "Type 2, kitchen" },
        { src: "assets/projects/rothruthi/ext-3.jpg", cap: "Garden front" },
        { src: "assets/projects/rothruthi/ext-4.jpg", cap: "Evening" }
      ],
      plans: [
        { src: "assets/plans/rothruthi/whg1.png", label: "Apartment 1", bg: "assets/projects/rothruthi/int-1.jpg", cap: "Type 1, garden level", m2: "3.5 rooms" },
        { src: "assets/plans/rothruthi/whg2.png", label: "Apartment 2", bg: "assets/projects/rothruthi/int-2.jpg", cap: "Type 2, standard plate", m2: "4.5 rooms" },
        { src: "assets/plans/rothruthi/whg12.png", label: "Apartment 12", bg: "assets/projects/rothruthi/panorama.jpg", cap: "Attic corner", m2: "4.5 rooms" }
      ],
      chain: [
        { kind: "esad", title: "The plot and the programme", text: "Thirteen apartments on stacked, repeating floor plates. At this scale the pre-sale rate decides when the cranes arrive.", proof: "2024" },
        { kind: "esad", title: "Three types, one logic", text: "Three plans repeat over three levels, so one drawn plan sells nine units and construction cost stays legible to the bank.", proof: "13 units" },
        { kind: "dionis", title: "The mix, tuned before filing", text: "Sizes matched to what the local market absorbs off plan.", proof: "Before permit" },
        { kind: "esad", title: "Building permit", text: "Filed with the unit mix already market-tested.", proof: "Granted" },
        { kind: "gate", title: "Pre-sale rate reached", text: "Reservations on plans released the construction credit.", proof: "Indicative" },
        { kind: "both", title: "Selling through construction", text: "The types sell from one drawing set while the site runs.", proof: "Selling" }
      ],
      chainNote: "Dates and pre-sale figures are indicative placeholders, to be replaced.",
      result: ["Three types sell nine units", "Pre-sale rate carried the credit release", "Selling through construction", "Delivery on schedule"],
      resultBg: "assets/projects/rothruthi/int-2.jpg",
      next: "seeblick"
    },
    seeblick: {
      slug: "seeblick",
      name: "Seeblick Birrwil",
      place: "Birrwil · Lake Hallwil",
      year: "2025",
      program: "New build · 7 apartments + commercial",
      status: "Pre-sales",
      strand: "both",
      tagline: "Seven apartments over the lake, the view is the business case.",
      hero: "assets/projects/seeblick/ext-1.jpg",
      context: "Hohlgasse 4, Birrwil: a sloping plot with a direct line to Lake Hallwil. The site photography came first, the drone frames set the datum lines every apartment had to reach.",
      design: "Seven units and a commercial ground floor, terraced so each living room owns the lake. Sections were worked until no apartment looks into the neighbour's parapet.",
      commercial: "Pre-sales opened on plans, site photography and the lake itself. Reservation before excavation, the classic Swiss off-plan sequence, run in-house.",
      figures: [
        { value: "7", label: "Apartments" },
        { value: "1", label: "Commercial unit" },
        { value: "2025", label: "Pre-sales open" }
      ],
      images: [
        { src: "assets/projects/seeblick/site-1.jpg", cap: "The lake from the plot" },
        { src: "assets/projects/seeblick/site-2.jpg", cap: "Hallwilersee, evening" }
      ],
      plans: [
        { src: "assets/plans/seeblick/wg01.png", label: "Apartment 01", bg: "assets/projects/seeblick/site-1.jpg", cap: "Apartment 01, lake level", m2: "Lake level" },
        { src: "assets/plans/seeblick/wg03.png", label: "Apartment 03", bg: "assets/projects/seeblick/site-2.jpg", cap: "Apartment 03, mid level", m2: "Mid level" },
        { src: "assets/plans/seeblick/erdgeschoss.png", label: "Ground floor", bg: "assets/projects/seeblick/ext-2.jpg", cap: "Ground floor, commercial", m2: "Commercial" }
      ],
      chain: [
        { kind: "esad", title: "The plot over the lake", text: "A sloping parcel with a direct line to Lake Hallwil. The drone frames set the datum lines every apartment had to reach.", proof: "2024" },
        { kind: "esad", title: "Terraced sections", text: "Seven units stepped so each living room owns the lake, no apartment looks into a parapet.", proof: "7 + 1 units" },
        { kind: "esad", title: "Building permit", text: "Volume held under the local datum, filed clean.", proof: "Granted" },
        { kind: "dionis", title: "Pre-sales on the view", text: "Plans, site photography and the lake itself. Reservation before excavation.", proof: "Pre-sales open" },
        { kind: "gate", title: "The financing gate", text: "Off-plan reservations carry the release of the construction credit.", proof: "In progress" },
        { kind: "both", title: "To delivery", text: "Execution set to the site managers, sales continuing on plans.", proof: "Next" }
      ],
      chainNote: "Dates and pre-sale figures are indicative placeholders, to be replaced.",
      result: ["Pre-sales open on plans", "Reservation before excavation", "Seven apartments and a commercial unit", "The view is the business case"],
      resultBg: "assets/projects/seeblick/ext-3.jpg",
      next: "niederrohrdorf"
    },
    niederrohrdorf: {
      slug: "niederrohrdorf",
      name: "Niederrohrdorf",
      place: "Niederrohrdorf AG",
      year: "2026",
      program: "Replacement build · 5 apartments",
      status: "In planning",
      strand: "both",
      tagline: "A replacement build, the existing house pays its way out.",
      hero: "assets/projects/niederrohrdorf/ext-1.jpg",
      context: "An ageing single house gives way to five apartments. Replacement builds carry a double feasibility: what the parcel allows, and what the demolition-to-delivery timeline does to financing.",
      design: "Five units across ground, upper and attic levels, with the volume held under the local height datum. The material concept was fixed early so visuals, plans and cost stay one document set.",
      commercial: "Sales documentation and exposé are prepared alongside the building permit, when the permit lands, pre-sales start the same week, not a quarter later.",
      figures: [
        { value: "5", label: "Apartments" },
        { value: "3", label: "Levels" },
        { value: "2026", label: "In planning" }
      ],
      images: [
        { src: "assets/projects/niederrohrdorf/ext-1.jpg", cap: "Street corner, day" },
        { src: "assets/projects/niederrohrdorf/ext-2.jpg", cap: "Garden side" },
        { src: "assets/projects/niederrohrdorf/int-1.jpg", cap: "Apartment 1, living" },
        { src: "assets/projects/niederrohrdorf/ext-3.jpg", cap: "Approach" },
        { src: "assets/projects/niederrohrdorf/diagram.jpg", cap: "Unit diagram" }
      ],
      plans: [
        { src: "assets/plans/niederrohrdorf/whg1.png", label: "Apartment 1", bg: "assets/projects/niederrohrdorf/int-1.jpg", cap: "Apartment 1, garden", m2: "Garden" },
        { src: "assets/plans/niederrohrdorf/whg3.png", label: "Apartment 3", bg: "assets/projects/niederrohrdorf/ext-3.jpg", cap: "Apartment 3, upper", m2: "Upper" },
        { src: "assets/plans/niederrohrdorf/whg5.png", label: "Apartment 5", bg: "assets/projects/niederrohrdorf/ext-2.jpg", cap: "Apartment 5, attic", m2: "Attic" }
      ],
      chain: [
        { kind: "esad", title: "An ageing house, a double feasibility", text: "What the parcel allows, and what the demolition to delivery timeline does to financing.", proof: "2025" },
        { kind: "esad", title: "Five units under the datum", text: "Ground, upper and attic levels, the material concept fixed early.", proof: "5 apartments" },
        { kind: "esad", title: "Permit in preparation", text: "Plans, cost and visuals kept as one document set.", proof: "In planning" },
        { kind: "dionis", title: "Exposé alongside the permit", text: "Sales documentation prepared in parallel, not after.", proof: "Ready" },
        { kind: "gate", title: "The gate ahead", text: "When the permit lands, pre-sales start the same week.", proof: "2026" }
      ],
      chainNote: "Dates are indicative placeholders, to be replaced.",
      result: ["Permit and exposé in parallel", "Pre-sales start with the permit", "Five apartments", "2026"],
      resultBg: "assets/projects/niederrohrdorf/int-1.jpg",
      next: "buero"
    },
    buero: {
      slug: "buero",
      name: "Umbau Büro",
      place: "6th floor conversion",
      year: "2025",
      program: "Office conversion",
      status: "Delivered",
      strand: "blueprint",
      tagline: "A sixth-floor office, rebuilt around the conversation.",
      hero: "assets/projects/buero/int-1.jpg",
      context: "A conversion, not a new build: an existing sixth floor re-planned as a client-facing office. The constraint was the shell; the brief was the meeting.",
      design: "The plan pulls the meeting zones to the light and keeps the workwall to the core. Interior visuals were used to sign off materials before a single wall moved.",
      commercial: "Delivered, the one project on this page that was never for sale. It is where the other four are sold from.",
      figures: [
        { value: "1", label: "Floor" },
        { value: "6", label: "Storeys up" },
        { value: "2025", label: "Delivered" }
      ],
      images: [
        { src: "assets/projects/buero/int-1.jpg", cap: "Reception" },
        { src: "assets/projects/buero/int-2.jpg", cap: "Meeting zone" },
        { src: "assets/projects/buero/int-3.jpg", cap: "Workwall" },
        { src: "assets/projects/buero/int-4.jpg", cap: "Lounge" },
        { src: "assets/projects/buero/int-5.jpg", cap: "Detail" }
      ],
      plans: [
        { src: "assets/plans/buero/grundriss-6og.png", label: "6th floor plan", bg: "assets/projects/buero/int-1.jpg", cap: "6th floor, as built", m2: "One floor" },
        { src: "assets/plans/buero/schnitt.png", label: "Section", bg: "assets/projects/buero/int-3.jpg", cap: "Section through the core", m2: "Section" }
      ],
      chain: [
        { kind: "esad", title: "The shell and the brief", text: "An existing sixth floor, re-planned around the client conversation.", proof: "2024" },
        { kind: "esad", title: "The plan to the light", text: "Meeting zones pulled to the glass, the workwall to the core.", proof: "One floor" },
        { kind: "esad", title: "Materials signed off on visuals", text: "Interior views approved the palette before a wall moved.", proof: "No surprises" },
        { kind: "esad", title: "Delivered", text: "The office the other projects are sold from.", proof: "2025" }
      ],
      chainNote: "",
      result: ["Delivered 2025", "The studio's own office", "Where the projects are sold from", "A conversion, one floor"],
      resultBg: "assets/projects/buero/int-2.jpg",
      next: "bellevue"
    }
  }
};
