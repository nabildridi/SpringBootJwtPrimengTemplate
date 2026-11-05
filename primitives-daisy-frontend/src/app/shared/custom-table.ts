import { Component, input, signal } from '@angular/core';
import {
  NgpPagination,
  NgpPaginationButton,
  NgpPaginationFirst,
  NgpPaginationNext,
  NgpPaginationPrevious,
  NgpPaginationLast,
} from 'ng-primitives/pagination';

@Component({
  selector: 'n-table',
  imports: [
    NgpPagination,
    NgpPaginationButton,
    NgpPaginationFirst,
    NgpPaginationNext,
    NgpPaginationPrevious,
    NgpPaginationLast,
  ],
  template: `
    <div class="overflow-x-auto rounded-box ">
      <table class="table border-2 border-base-content/5 bg-base-300">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
        </tbody>
      </table>

      <footer class="footer justify-end p-4 bg-base-200">
        <nav
          [(ngpPaginationPage)]="page"
          ngpPagination
          ngpPaginationPageCount="5"
          aria-label="Pagination Navigation"
        >
          <ul class="flex items-center gap-2">
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-300 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationFirst
                aria-label="First Page"
              >
                <i class="bx bx-chevrons-left"></i>
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-300 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationPrevious
                aria-label="Previous Page"
              >
                <i class="bx bx-chevron-left"></i>
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-700 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationButton
                ngpPaginationButtonPage="1"
                aria-label="Page 1"
              >
                1
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-700 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationButton
                ngpPaginationButtonPage="2"
                aria-label="Page 2"
              >
                2
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-700 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationButton
                ngpPaginationButtonPage="3"
                aria-label="Page 3"
              >
                3
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-700 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationButton
                ngpPaginationButtonPage="4"
                aria-label="Page 4"
              >
                4
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-700 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationButton
                ngpPaginationButtonPage="5"
                aria-label="Page 5"
              >
                5
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-300 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationNext
                aria-label="Next Page"
              >
                <i class="bx bx-chevron-right"></i>
              </button>
            </li>
            <li>
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border-none bg-white text-[14px] font-medium text-gray-900 shadow-sm outline-hidden transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none data-selected:bg-[#f01e2b] data-selected:text-white dark:border dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-100 dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-900 dark:focus-visible:outline-blue-400 dark:active:bg-gray-800 dark:disabled:border-none dark:disabled:bg-zinc-900 dark:disabled:text-gray-300 dark:data-selected:border-none dark:data-selected:bg-[#ff4651] dark:data-selected:text-white"
                ngpPaginationLast
                aria-label="Last Page"
              >
                <i class="bx bx-chevrons-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  `,
})
export class DaisyTable {
  data = input.required<any[]>();
  page = signal<number>(1);
}
