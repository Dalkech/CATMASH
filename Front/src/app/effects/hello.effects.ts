import { effect } from '@angular/core';

export function ChangeTextColorRandomlyEffect(
    HtmlElement: HTMLElement
) {
    setInterval(() => {
        effect(() => {
            HtmlElement.style.color = 
            `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        })
    }, 1500);
}