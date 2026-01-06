export const colors = ["orange", "amber", "yellow", "lime", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "slate"] as const;
export type ColorScheme = typeof colors[number];

export const colorClasses: Record<ColorScheme, {
    bg: string;
    bgHover: string;
    text: string;
    textHover: string;
    border: string;
    borderHover: string;
}> = {
    orange: {
        bg: "bg-orange-600",
        bgHover: "bg-orange-500",
        text: "text-orange-600",
        textHover: "text-orange-500",
        border: "border-orange-600",
        borderHover: "border-orange-500",
    },
    amber: {
        bg: "bg-amber-600",
        bgHover: "bg-amber-500",
        text: "text-amber-600",
        textHover: "text-amber-500",
        border: "border-amber-600",
        borderHover: "border-amber-500",
    },
    yellow: {
        bg: "bg-yellow-600",
        bgHover: "bg-yellow-500",
        text: "text-yellow-600",
        textHover: "text-yellow-500",
        border: "border-yellow-600",
        borderHover: "border-yellow-500",
    },
    lime: {
        bg: "bg-lime-600",
        bgHover: "bg-lime-500",
        text: "text-lime-600",
        textHover: "text-lime-500",
        border: "border-lime-600",
        borderHover: "border-lime-500",
    },
    emerald: {
        bg: "bg-emerald-600",
        bgHover: "bg-emerald-500",
        text: "text-emerald-600",
        textHover: "text-emerald-500",
        border: "border-emerald-600",
        borderHover: "border-emerald-500",
    },
    teal: {
        bg: "bg-teal-600",
        bgHover: "bg-teal-500",
        text: "text-teal-600",
        textHover: "text-teal-500",
        border: "border-teal-600",
        borderHover: "border-teal-500",
    },
    cyan: {
        bg: "bg-cyan-600",
        bgHover: "bg-cyan-500",
        text: "text-cyan-600",
        textHover: "text-cyan-500",
        border: "border-cyan-600",
        borderHover: "border-cyan-500",
    },
    sky: {
        bg: "bg-sky-600",
        bgHover: "bg-sky-500",
        text: "text-sky-600",
        textHover: "text-sky-500",
        border: "border-sky-600",
        borderHover: "border-sky-500",
    },
    blue: {
        bg: "bg-blue-600",
        bgHover: "bg-blue-500",
        text: "text-blue-600",
        textHover: "text-blue-500",
        border: "border-blue-600",
        borderHover: "border-blue-500",
    },
    indigo: {
        bg: "bg-indigo-600",
        bgHover: "bg-indigo-500",
        text: "text-indigo-600",
        textHover: "text-indigo-500",
        border: "border-indigo-600",
        borderHover: "border-indigo-500",
    },
    violet: {
        bg: "bg-violet-600",
        bgHover: "bg-violet-500",
        text: "text-violet-600",
        textHover: "text-violet-500",
        border: "border-violet-600",
        borderHover: "border-violet-500",
    },
    purple: {
        bg: "bg-purple-600",
        bgHover: "bg-purple-500",
        text: "text-purple-600",
        textHover: "text-purple-500",
        border: "border-purple-600",
        borderHover: "border-purple-500",
    },
    fuchsia: {
        bg: "bg-fuchsia-600",
        bgHover: "bg-fuchsia-500",
        text: "text-fuchsia-600",
        textHover: "text-fuchsia-500",
        border: "border-fuchsia-600",
        borderHover: "border-fuchsia-500",
    },
    pink: {
        bg: "bg-pink-600",
        bgHover: "bg-pink-500",
        text: "text-pink-600",
        textHover: "text-pink-500",
        border: "border-pink-600",
        borderHover: "border-pink-500",
    },
    rose: {
        bg: "bg-rose-600",
        bgHover: "bg-rose-500",
        text: "text-rose-600",
        textHover: "text-rose-500",
        border: "border-rose-600",
        borderHover: "border-rose-500",
    },
    slate: {
        bg: "bg-slate-600",
        bgHover: "bg-slate-500",
        text: "text-slate-600",
        textHover: "text-slate-500",
        border: "border-slate-600",
        borderHover: "border-slate-500",
    },
};

