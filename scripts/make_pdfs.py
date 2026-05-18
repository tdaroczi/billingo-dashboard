from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
DOCS = ROOT / "docs"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def register_fonts():
    pdfmetrics.registerFont(TTFont("DocRegular", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("DocBold", FONT_BOLD))


def clean_text(text):
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("`", "")
    )


def inline_markdown(text):
    text = clean_text(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
    return text


def build_styles():
    base = getSampleStyleSheet()
    styles = {
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Title"],
            fontName="DocBold",
            fontSize=30,
            leading=36,
            textColor=colors.HexColor("#0f172a"),
            alignment=TA_CENTER,
            spaceAfter=14,
        ),
        "cover_subtitle": ParagraphStyle(
            "cover_subtitle",
            parent=base["Normal"],
            fontName="DocRegular",
            fontSize=13,
            leading=19,
            textColor=colors.HexColor("#475569"),
            alignment=TA_CENTER,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="DocBold",
            fontSize=20,
            leading=25,
            textColor=colors.HexColor("#111827"),
            spaceBefore=12,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="DocBold",
            fontSize=15,
            leading=20,
            textColor=colors.HexColor("#1f2937"),
            spaceBefore=10,
            spaceAfter=6,
        ),
        "h3": ParagraphStyle(
            "h3",
            parent=base["Heading3"],
            fontName="DocBold",
            fontSize=12,
            leading=16,
            textColor=colors.HexColor("#334155"),
            spaceBefore=8,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["BodyText"],
            fontName="DocRegular",
            fontSize=9.5,
            leading=13.5,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["BodyText"],
            fontName="DocRegular",
            fontSize=9.3,
            leading=13,
            leftIndent=12,
            firstLineIndent=-8,
            bulletIndent=0,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=3,
        ),
        "quote": ParagraphStyle(
            "quote",
            parent=base["BodyText"],
            fontName="DocBold",
            fontSize=11,
            leading=16,
            leftIndent=12,
            rightIndent=10,
            textColor=colors.HexColor("#4338ca"),
            backColor=colors.HexColor("#eef2ff"),
            borderColor=colors.HexColor("#c7d2fe"),
            borderWidth=0.6,
            borderPadding=8,
            spaceBefore=6,
            spaceAfter=8,
        ),
        "code": ParagraphStyle(
            "code",
            parent=base["Code"],
            fontName="Courier",
            fontSize=8,
            leading=11,
            textColor=colors.HexColor("#334155"),
            backColor=colors.HexColor("#f1f5f9"),
            borderPadding=6,
            spaceAfter=6,
        ),
        "post_body": ParagraphStyle(
            "post_body",
            parent=base["BodyText"],
            fontName="DocRegular",
            fontSize=12,
            leading=18,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=9,
        ),
        "post_bullet": ParagraphStyle(
            "post_bullet",
            parent=base["BodyText"],
            fontName="DocRegular",
            fontSize=11.5,
            leading=17,
            leftIndent=16,
            firstLineIndent=-10,
            bulletIndent=0,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=5,
        ),
    }
    return styles


class BrandedDoc(BaseDocTemplate):
    def __init__(self, filename, title, subtitle, **kwargs):
        self.title_text = title
        self.subtitle_text = subtitle
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=18 * mm,
            bottomMargin=16 * mm,
            **kwargs,
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height - 5 * mm,
            id="normal",
        )
        self.addPageTemplates([PageTemplate(id="main", frames=frame, onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setFillColor(colors.HexColor("#f8fafc"))
        canvas.rect(0, 0, width, height, fill=1, stroke=0)
        canvas.setFillColor(colors.HexColor("#6366f1"))
        canvas.roundRect(15 * mm, height - 16 * mm, 8 * mm, 8 * mm, 2 * mm, fill=1, stroke=0)
        canvas.setFillColor(colors.white)
        canvas.setFont("DocBold", 8)
        canvas.drawCentredString(19 * mm, height - 13.3 * mm, "B")
        canvas.setFillColor(colors.HexColor("#475569"))
        canvas.setFont("DocRegular", 8)
        canvas.drawString(26 * mm, height - 12.2 * mm, "Billingo MI irányítópult")
        canvas.setFillColor(colors.HexColor("#94a3b8"))
        canvas.setFont("DocRegular", 8)
        canvas.drawRightString(width - 18 * mm, 9 * mm, f"{doc.page}")
        canvas.restoreState()


def add_cover(story, styles, title, subtitle, kind):
    story.append(Spacer(1, 34 * mm))
    story.append(Paragraph(title, styles["cover_title"]))
    story.append(Paragraph(subtitle, styles["cover_subtitle"]))
    story.append(Spacer(1, 12 * mm))
    data = [
        [
            Paragraph("<b>Anyag típusa</b><br/>" + kind, styles["body"]),
            Paragraph("<b>Bemutató dátuma</b><br/>2026. május 21.", styles["body"]),
            Paragraph("<b>Adatbiztonság</b><br/>Fiktív adatokkal", styles["body"]),
        ]
    ]
    table = Table(data, colWidths=[52 * mm, 52 * mm, 52 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#cbd5e1")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#e2e8f0")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    story.append(table)
    story.append(PageBreak())


def markdown_to_story(path, styles, post=False):
    lines = path.read_text(encoding="utf-8").splitlines()
    story = []
    in_code = False
    code_lines = []
    for line in lines:
        raw = line.rstrip()
        if raw.startswith("```"):
            if in_code:
                story.append(Paragraph("<br/>".join(clean_text(x) for x in code_lines), styles["code"]))
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(raw)
            continue
        if not raw.strip():
            story.append(Spacer(1, 2.5 * mm))
            continue
        if raw.startswith("# "):
            story.append(Paragraph(inline_markdown(raw[2:]), styles["h1"]))
        elif raw.startswith("## "):
            story.append(Paragraph(inline_markdown(raw[3:]), styles["h1" if post else "h2"]))
        elif raw.startswith("### "):
            story.append(Paragraph(inline_markdown(raw[4:]), styles["h2" if post else "h3"]))
        elif raw.startswith("> "):
            story.append(Paragraph(inline_markdown(raw[2:]), styles["quote"]))
        elif raw.startswith("- "):
            story.append(Paragraph(inline_markdown(raw[2:]), styles["post_bullet" if post else "bullet"], bulletText="•"))
        elif re.match(r"^\d+\. ", raw):
            text = re.sub(r"^\d+\. ", "", raw)
            story.append(Paragraph(inline_markdown(text), styles["post_bullet" if post else "bullet"], bulletText="•"))
        else:
            story.append(Paragraph(inline_markdown(raw), styles["post_body" if post else "body"]))
    return story


def build_pdf(source, dest, title, subtitle, kind, post=False):
    styles = build_styles()
    story = []
    add_cover(story, styles, title, subtitle, kind)
    story.extend(markdown_to_story(source, styles, post=post))
    doc = BrandedDoc(str(dest), title, subtitle)
    doc.build(story)


def main():
    register_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    build_pdf(
        DOCS / "hasznalati-utasitas.md",
        OUT / "billingo-mi-hasznalati-utasitas.pdf",
        "Billingo MI irányítópult",
        "Használati utasítás és bemutatói forgatókönyv",
        "Részletes használati útmutató",
        post=False,
    )
    build_pdf(
        DOCS / "figyelemfelkelto-poszt.md",
        OUT / "billingo-mi-figyelemfelkelto-poszt.pdf",
        "Mi lenne, ha a számlázód gondolkodni is segítene?",
        "Rövid poszt / blogbejegyzés a csütörtöki beszélgetéshez",
        "Figyelemfelkeltő kommunikációs anyag",
        post=True,
    )


if __name__ == "__main__":
    main()
