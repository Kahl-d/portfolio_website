/**
 * ContextAwareNavigation.ts
 * 
 * Handles parsing of AI commands (e.g., [[NAVIGATE:SKILLS]]) and 
 * mapping them to actual scroll targets on the page.
 */

export type NavigationTarget =
    | "LANDING"
    | "ABOUT"
    | "EXPERIENCE"
    | "SKILLS"
    | "WRITING"
    | "HIGHLIGHTS"
    | "CONTACT";

export interface AICommand {
    type: "NAVIGATE" | "NONE";
    target?: NavigationTarget;
    cleanText: string;
}

export function parseAIResponse(text: string): AICommand {
    const navigateRegex = /\[\[NAVIGATE:([A-Z_]+)\]\]/;
    const match = text.match(navigateRegex);

    if (match && match[1]) {
        return {
            type: "NAVIGATE",
            target: match[1] as NavigationTarget,
            cleanText: text.replace(navigateRegex, "").trim()
        };
    }

    return {
        type: "NONE",
        cleanText: text
    };
}
