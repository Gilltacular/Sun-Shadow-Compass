import { createRequire as __cr } from 'node:module';
const __require = __cr(import.meta.url);
var __require2 = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/types.ts
var SPA_ZA = 0;
var SPA_ZA_INC = 1;
var SPA_ZA_RTS = 2;
var SPA_ALL = 3;

// src/index.ts
var DEG = Math.PI / 180;
var _load = typeof __require === "function" ? __require : __require2;
var spa = _load("../lib/spa.cjs");
function assertFiniteNumber(value, name) {
  if (typeof value !== "number" || !isFinite(value)) {
    throw new TypeError(
      `SPA: ${name} must be a finite number, got ${typeof value === "number" ? value : typeof value}`
    );
  }
}
function formatTime(hours) {
  if (!isFinite(hours) || hours < 0) return "N/A";
  const totalSec = Math.round(hours * 3600);
  const h = Math.floor(totalSec / 3600) % 24;
  const rem = totalSec - Math.floor(totalSec / 3600) * 3600;
  const m = Math.floor(rem / 60);
  const s = rem - m * 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function adjustForCustomAngle(base, zenithAngle) {
  const phi = base.latitude * DEG;
  const delta = base.delta * DEG;
  const Z = zenithAngle * DEG;
  const cosH0 = (Math.cos(Z) - Math.sin(phi) * Math.sin(delta)) / (Math.cos(phi) * Math.cos(delta));
  if (cosH0 < -1 || cosH0 > 1) {
    return { sunrise: NaN, sunset: NaN };
  }
  const H0h = Math.acos(cosH0) / DEG / 15;
  return {
    sunrise: base.suntransit - H0h,
    sunset: base.suntransit + H0h
  };
}
function getSpa(date, latitude, longitude, timezone, options, angles) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError("SPA: date must be a valid Date object");
  }
  assertFiniteNumber(latitude, "latitude");
  assertFiniteNumber(longitude, "longitude");
  if (latitude < -90 || latitude > 90) {
    throw new RangeError(`SPA: latitude must be between -90 and 90, got ${latitude}`);
  }
  if (longitude < -180 || longitude > 180) {
    throw new RangeError(`SPA: longitude must be between -180 and 180, got ${longitude}`);
  }
  const tz = timezone ?? 0;
  assertFiniteNumber(tz, "timezone");
  if (tz < -18 || tz > 18) {
    throw new RangeError(`SPA: timezone must be between -18 and 18, got ${tz}`);
  }
  const opts = options ?? {};
  const optNumericFields = [
    "elevation",
    "pressure",
    "temperature",
    "delta_t",
    "slope",
    "azm_rotation",
    "atmos_refract"
  ];
  for (const field of optNumericFields) {
    if (opts[field] !== void 0) {
      assertFiniteNumber(opts[field], `options.${field}`);
    }
  }
  const fnCode = opts.function ?? SPA_ZA_RTS;
  if (fnCode !== 0 && fnCode !== 1 && fnCode !== 2 && fnCode !== 3) {
    throw new RangeError(
      `SPA: options.function must be 0 (SPA_ZA), 1 (SPA_ZA_INC), 2 (SPA_ZA_RTS), or 3 (SPA_ALL), got ${fnCode}`
    );
  }
  if (angles && angles.length > 0) {
    for (let i = 0; i < angles.length; i++) {
      const a = angles[i];
      if (typeof a !== "number" || !isFinite(a)) {
        throw new TypeError(
          `SPA: angles[${i}] must be a finite number, got ${typeof a === "number" ? a : typeof a}`
        );
      }
      if (a < 0 || a > 180) {
        throw new RangeError(`SPA: angles[${i}] must be between 0 and 180, got ${a}`);
      }
    }
  }
  if (angles && angles.length > 0 && fnCode !== 2 && fnCode !== 3) {
    throw new RangeError(
      "SPA: custom zenith angle calculations require an RTS function code (SPA_ZA_RTS or SPA_ALL)"
    );
  }
  const d = new spa.SpaData();
  d.year = date.getUTCFullYear();
  d.month = date.getUTCMonth() + 1;
  d.day = date.getUTCDate();
  d.hour = date.getUTCHours();
  d.minute = date.getUTCMinutes();
  d.second = date.getUTCSeconds();
  d.longitude = longitude;
  d.latitude = latitude;
  d.timezone = tz;
  d.elevation = opts.elevation ?? 0;
  d.pressure = opts.pressure ?? 1013;
  d.temperature = opts.temperature ?? 15;
  d.delta_ut1 = opts.delta_ut1 ?? 0;
  d.delta_t = opts.delta_t ?? 67;
  d.slope = opts.slope ?? 0;
  d.azm_rotation = opts.azm_rotation ?? 0;
  d.atmos_refract = opts.atmos_refract ?? 0.5667;
  d.function = fnCode;
  const rc = spa.spa_calculate(d);
  if (rc !== 0) {
    throw new Error(`SPA: calculation failed (error code ${rc})`);
  }
  const hasRts = fnCode === 2 || fnCode === 3;
  const result = {
    zenith: d.zenith,
    azimuth: d.azimuth,
    sunrise: hasRts ? d.sunrise : NaN,
    solarNoon: hasRts ? d.suntransit : NaN,
    sunset: hasRts ? d.sunset : NaN
  };
  if (angles && angles.length > 0) {
    const angleResults = angles.map((Z) => adjustForCustomAngle(d, Z));
    return {
      ...result,
      angles: angleResults
    };
  }
  return result;
}
function calcSpa(date, latitude, longitude, timezone, options, angles) {
  if (angles !== void 0 && angles.length > 0) {
    const raw2 = getSpa(
      date,
      latitude,
      longitude,
      timezone,
      options,
      angles
    );
    return {
      zenith: raw2.zenith,
      azimuth: raw2.azimuth,
      sunrise: formatTime(raw2.sunrise),
      solarNoon: formatTime(raw2.solarNoon),
      sunset: formatTime(raw2.sunset),
      angles: raw2.angles.map(
        (a) => ({
          sunrise: formatTime(a.sunrise),
          sunset: formatTime(a.sunset)
        })
      )
    };
  }
  const raw = getSpa(date, latitude, longitude, timezone, options);
  return {
    zenith: raw.zenith,
    azimuth: raw.azimuth,
    sunrise: formatTime(raw.sunrise),
    solarNoon: formatTime(raw.solarNoon),
    sunset: formatTime(raw.sunset)
  };
}
export {
  SPA_ALL,
  SPA_ZA,
  SPA_ZA_INC,
  SPA_ZA_RTS,
  calcSpa,
  formatTime,
  getSpa
};
//# sourceMappingURL=index.mjs.map