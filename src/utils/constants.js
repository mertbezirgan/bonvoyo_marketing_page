/**
 * Constants used for calculating savings and environmental impact
 */

// Hours saved by automating one invoice
export const HOURS_SAVED_PER_INVOICE = 0.5;

// Grams CO₂-eq per passenger-km (car)
export const BASELINE_CAR_CO2 = 166;

// Grams CO₂-eq per passenger-km (public transport)
export const CO2_PER_PUBLIC_TRIP = 45;

// Grams CO₂-eq per passenger-km (other means)
export const CO2_PER_OTHER_TRIP = 3;

// Built-in trips per employee per quarter (2 trips per day * 60 working days)
export const TRIPS_PER_QUARTER = 2 * 60; 