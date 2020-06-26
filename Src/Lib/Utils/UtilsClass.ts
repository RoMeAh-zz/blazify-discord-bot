import {encode} from "punycode";

export class Utils {
    public static formatTime(options: { milliseconds: number, minimal:  boolean}) {
        let { milliseconds, minimal } = options
        if(milliseconds <= 0) throw new RangeError("UtilsClass#formatTime Error! You can only pass numbers more than 0")
        if (milliseconds) {
            const times = {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
            while (milliseconds > 0) {
                if (milliseconds - 31557600000 >= 0) {
                    milliseconds -= 31557600000;
                    times.years++;
                } else if (milliseconds - 2628000000 >= 0) {
                    milliseconds -= 2628000000;
                    times.months++;
                } else if (milliseconds - 604800000 >= 0) {
                    milliseconds -= 604800000;
                    times.weeks += 7;
                } else if (milliseconds - 86400000 >= 0) {
                    milliseconds -= 86400000;
                    times.days++;
                } else if (milliseconds - 3600000 >= 0) {
                    milliseconds -= 3600000;
                    times.hours++;
                } else if (milliseconds - 60000 >= 0) {
                    milliseconds -= 60000;
                    times.minutes++;
                } else {
                    times.seconds = Math.round(milliseconds / 1000);
                    milliseconds = 0;
                }
            }
            const finalTime = [];
            let first = false;
            for (const [k, v] of Object.entries(times)) {
                if (minimal) {
                    if (v === 0 && !first) {
                        continue;
                    }
                    finalTime.push(v < 10 ? `0${v}` : `${v}`);
                    first = true;
                    continue;
                }
                if (v > 0) {
                    finalTime.push(`${v} ${v > 1 ? k : k.slice(0, -1)}`);
                }
            }
            let time = finalTime.join(minimal ? ":" : ", ");
            if (time.includes(",")) {
                const pos = time.lastIndexOf(",");
                time = `${time.slice(0, pos)} and ${time.slice(pos + 1)}`;
            }
            return time;
        }
    };
        public static encode(input) {
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;

            input = this.utf8(input)

            while (i < input.length) {

                chr1 = input.charCodeAt(i++)
                chr2 = input.charCodeAt(i++)
                chr3 = input.charCodeAt(i++)

                enc1 = chr1 >> 2
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                enc4 = chr3 & 63

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }
                let _keyStr =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4)

            }

            return output
        };
        public static utf8 (string) {
            string = string.replace(/\r\n/g, "\n")
            let utftext = "";

            for (let n = 0; n < string.length; n++) {

                const c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192)
                    utftext += String.fromCharCode((c & 63) | 128)
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224)
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                    utftext += String.fromCharCode((c & 63) | 128)
                }
            }
            return utftext
        }
    }