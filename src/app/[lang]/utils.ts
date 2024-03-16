export const GenerateClass = (lang: string, styles: { [key: string]: string }) => (...cssClasses: string[]) => {
    let classes = ``;
    for (const cssClass of cssClasses) {
        if (styles[cssClass]) {
            if (lang === "fa") {
                if (styles[`${cssClass}Fa`]) {
                    classes += `${styles[cssClass]} ${styles[`${cssClass}Fa`]}`;
                }
                else {
                    classes += styles[cssClass];
                }
            } else {
                classes += styles[cssClass];
            }
        }
        classes += " ";
    }
    return classes;
};

export const RelativeFormatDate = (date: Date, language: string): string => {
    const now = new Date();
    const theDate = new Date(date);
    const diff = now.getTime() - theDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
        return "Just Now";
    } else if (minutes < 60) {
        return getRelativeFormatDate(minutes, "minute", language);
    } else if (hours < 24) {
        return getRelativeFormatDate(hours, "hour", language);
    } else if (days < 7) {
        return getRelativeFormatDate(days, "day", language);
    } else if (weeks < 4) {
        return getRelativeFormatDate(weeks, "week", language);
    } else {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return theDate.toLocaleDateString(undefined, options);
    }
    return "";
}

const getRelativeFormatDate = (value: number, type: string, language: string): string => {
    switch (type) {
        case "now":
            switch (language) {
                case "en": return "Just Now";
                case "fa": return "چند لحظه قبل";
                case "deu": return "Jetzt";
                default: return "Just Now";
            }
        case "minute":
            switch (language) {
                case "en": return `${value} minute${value > 1 ? 's' : ''} ago`;
                case "fa": return `${value} دقیقه قبل`;
                case "deu": return "";
                default: return "";
            }

        case "hour":
            switch (language) {
                case "en": return `${value} hour${value > 1 ? 's' : ''} ago`;
                case "fa": return `${value} ساعت قبل`;
                case "deu": return "";
                default: return "";
            }
        case "day":
            switch (language) {
                case "en": return `${value} day${value > 1 ? 's' : ''} ago`;
                case "fa": return `${value} روز قبل`;
                case "deu": return "";
                default: return "";
            }
        case "week":
            switch (language) {
                case "en": return `${value} week${value > 1 ? 's' : ''} ago`;
                case "fa": return `${value} هفته قبل`;
                case "deu": return "";
                default: return "";
            }
        default: return "";
    }
}

