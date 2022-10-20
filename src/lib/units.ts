export function calculate_units(window: Window) {
    let ratio = window.innerWidth / window.innerHeight;

    console.log(ratio);

    return Math.max(40, -35 * (ratio - 2.92)) / 40;
}