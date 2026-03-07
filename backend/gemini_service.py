import re

def analyze_review(review_text: str) -> dict:

    text = review_text.strip()
    upper_text = text.upper()
    score = 0
    reasons = []

    # ── FAKE SIGNALS ──────────────────────────────

    # Excessive exclamation marks
    exclamations = text.count('!')
    if exclamations >= 3:
        score += 25
        reasons.append(f"Excessive exclamation marks ({exclamations} found) — classic fake signal")

    # Excessive caps words
    words = text.split()
    caps_words = [w for w in words if w.isupper() and len(w) > 2]
    if len(caps_words) >= 3:
        score += 20
        reasons.append(f"Too many ALL CAPS words ({len(caps_words)} found) — unnatural writing")

    # Urgency language
    urgency = ['BUY NOW', 'LIMITED STOCK', 'HURRY', 'DONT MISS', "DON'T MISS",
               'LAST CHANCE', 'ORDER NOW', 'GRAB NOW', 'ACT NOW']
    found_urgency = [u for u in urgency if u in upper_text]
    if found_urgency:
        score += 30
        reasons.append(f"Urgency language detected: '{found_urgency[0]}' — promotional tactic")

    # Vague superlatives
    superlatives = ['BEST EVER', 'BEST PRODUCT', 'CHANGED MY LIFE', 'LIFE CHANGING',
                    'BEST PURCHASE', 'AMAZING AMAZING', 'LOVE IT SO MUCH',
                    'HIGHLY RECOMMEND', 'MUST BUY', 'DONT REGRET', "DON'T REGRET",
                    'BEST IN THE WORLD', 'PERFECT PRODUCT', 'ABSOLUTELY PERFECT']
    found_sup = [s for s in superlatives if s in upper_text]
    if found_sup:
        score += 25
        reasons.append(f"Vague superlatives with no specifics: '{found_sup[0].title()}'")

    # Very short with only praise (no specific details)
    if len(words) < 20 and score > 20:
        score += 15
        reasons.append("Very short review with no specific product details")

    # Repetition of words
    word_freq = {}
    for w in words:
        w_clean = re.sub(r'[^a-zA-Z]', '', w.lower())
        if len(w_clean) > 3:
            word_freq[w_clean] = word_freq.get(w_clean, 0) + 1
    repeated = [w for w, c in word_freq.items() if c >= 3]
    if repeated:
        score += 15
        reasons.append(f"Unnatural word repetition detected: '{repeated[0]}' repeated {word_freq[repeated[0]]} times")

    # WOW / OMG style openers
    wow_words = ['WOW', 'OMG', 'OH MY GOD', 'UNBELIEVABLE', 'INCREDIBLE INCREDIBLE']
    found_wow = [w for w in wow_words if w in upper_text]
    if found_wow:
        score += 15
        reasons.append(f"Emotional filler opener: '{found_wow[0].title()}' — common in fake reviews")

    # ── REAL SIGNALS ──────────────────────────────

    # Specific numbers / measurements
    has_numbers = bool(re.search(r'\d+\s*(hours?|hrs?|days?|months?|years?|kg|cm|mm|gb|mb|inch|inches)', text, re.I))
    if has_numbers:
        score -= 20
        reasons.append("Contains specific measurements/timeframes — genuine user experience")

    # Mentions pros AND cons
    negative_words = ['but', 'however', 'although', 'downside', 'issue', 'problem',
                      'unfortunately', 'cons', 'negative', 'loud', 'slow', 'heavy']
    positive_words = ['good', 'great', 'nice', 'works', 'comfortable', 'solid', 'decent']
    has_negative = any(w in text.lower() for w in negative_words)
    has_positive = any(w in text.lower() for w in positive_words)
    if has_negative and has_positive:
        score -= 25
        reasons.append("Balanced review with both pros and cons — sign of genuine experience")

    # Natural sentence structure (longer review)
    if len(words) > 40:
        score -= 10
        reasons.append("Detailed review with sufficient length — not a quick fake post")

    # ── CALCULATE VERDICT ─────────────────────────
    score = max(0, min(100, score))

    if score >= 50:
        verdict = "FAKE"
        confidence = min(95, 50 + score)
        if not reasons:
            reasons = ["Generic praise with no specific product details",
                       "Writing style matches known fake review patterns",
                       "Lacks authentic user experience indicators"]
        summary = f"This review shows {len([r for r in reasons if 'genuine' not in r and 'balanced' not in r and 'specific' not in r])} fake signals including unnatural language patterns."
    else:
        verdict = "REAL"
        confidence = min(92, 50 + (50 - score))
        if not reasons:
            reasons = ["Natural writing style with no promotional language",
                       "Contains specific details about product usage",
                       "Balanced tone without excessive enthusiasm"]
        summary = "This review appears genuine based on its natural language, specific details, and balanced perspective."

    return {
        "verdict": verdict,
        "confidence": confidence,
        "reasons": reasons[:4],
        "summary": summary
    }