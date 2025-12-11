// usuarios

import { writable } from "svelte/store";
import { browser } from "$app/environment";

let usr = null;

if (browser) {
    const stored = localStorage.getItem("user");
    if (stored) usr = JSON.parse(stored);
}

export const user = writable(usr);

if (browser) {
    user.subscribe(function(value) {
        if (value) {
            localStorage.setItem("user", JSON.stringify(value));
        } else {
            localStorage.removeItem("user");
        }
    });
}