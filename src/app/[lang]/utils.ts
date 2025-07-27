import localFont from "next/font/local";
import { Genos } from "next/font/google";
import moment from 'jalali-moment';

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

export const RelativeFormatDate = (date: Date | string, language: string): string => {
    const now = moment(); 
    const theDate = moment(date);

    const diff = now.diff(theDate, 'seconds');
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const weeks = Math.floor(diff / 604800);

    if (diff < 60) {
        return getRelativeFormatDate(diff, "now", language);
    } else if (minutes < 60) {
        return getRelativeFormatDate(minutes, "minute", language);
    } else if (hours < 24) {
        return getRelativeFormatDate(hours, "hour", language);
    } else if (days < 7) {
        return getRelativeFormatDate(days, "day", language);
    } else if (weeks < 4) {
        return getRelativeFormatDate(weeks, "week", language);
    } else {
        switch (language) {
            case "fa": {
                const jDate = theDate.locale("fa").format("jDD jMMMM jYYYY"); // e.g. 04 اسفند 1404
                return jDate;
            }
            case "en":
                return theDate.locale("en").format("MMM D, YYYY");
            case "deu":
                return theDate.locale("de").format("D. MMM YYYY");
            default:
                return theDate.format("MMM D, YYYY");
        }
    }
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

export const VazirFont = localFont({ src: "../fonts/vazir.woff2" });

export const GenosFont = Genos({
    subsets: ["latin"],
    variable: "--font-genos"
});


export const convertToPersianDate = (date: Date | string): { date: string; time: string } => {
    if (date) {
        try {
            const jalaliDate = moment(date).locale('fa'); // Set locale to Persian

            // Format parts
            const weekDay = jalaliDate.format('dddd'); // Persian weekday
            const day = jalaliDate.format('D'); // Day of the month
            const month = jalaliDate.format('MMMM'); // Persian month name
            const year = jalaliDate.format('YYYY'); // Persian year
            const time = jalaliDate.format('HH:mm'); // Time in 24-hour format

            return {
                date: `${weekDay} ${day} ${month} ${year}`,
                time: `ساعت ${time}`,
            };
        } catch (error) {
            console.error(error);
            return { date: "", time: "" }
        }
    } else {
        return {
            date: "", time: "null"
        }
    }
}

export const convertToPersianDateOfficial = (date: Date | string | moment.Moment): string => {
    try {
        const jalaliDate = moment.isMoment(date) ? date.clone().locale('fa') : moment(date).locale('fa');

        return jalaliDate.format('YYYY/MM/DD'); // Official format with zero padding
    } catch (error) {
        console.error('Persian date conversion failed:', error);
        return "";
    }
};
