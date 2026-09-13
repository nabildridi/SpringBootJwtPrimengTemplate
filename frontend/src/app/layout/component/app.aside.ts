import { Component, effect, inject } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-aside',
  imports: [NgClass],
  template: `
    <aside
      class="flex flex-col bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800"
      [ngClass]="layoutService.asideState() ? 'w-64' : 'w-0'"
    >
      <!-- Header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        <span
          class="font-black text-xl text-white tracking-widest uppercase transition-opacity duration-200"
          :class="collapsed ? 'opacity-0' : 'opacity-100'"
          >Nexus</span
        >
        <button
          class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 focus:outline-none transition-colors"
        >
          <svg
            class="h-5 w-5 transition-transform duration-300"
            :class="{'rotate-180': collapsed}"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <a
          href="##"
          class="flex items-center p-3 rounded-xl hover:bg-slate-800 transition-colors group"
        >
          <svg
            class="h-6 w-6 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span
            class="ml-4 font-bold text-sm transition-opacity duration-200 whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0' : 'opacity-100'"
            >Dashboard</span
          >
        </a>
        <a
          href="##"
          class="flex items-center p-3 rounded-xl hover:bg-slate-800 transition-colors group"
        >
          <svg
            class="h-6 w-6 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span
            class="ml-4 font-bold text-sm transition-opacity duration-200 whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0' : 'opacity-100'"
            >Analytics</span
          >
        </a>
        <a
          href="##"
          class="flex items-center p-3 rounded-xl hover:bg-slate-800 transition-colors group"
        >
          <svg
            class="h-6 w-6 text-slate-500 group-hover:text-rose-400 transition-colors shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span
            class="ml-4 font-bold text-sm transition-opacity duration-200 whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0' : 'opacity-100'"
            >Settings</span
          >
        </a>
      </nav>
    </aside>
  `,
})
export class AppAside {
  constructor(public layoutService: LayoutService) {}
}
