<template>
    <nav class="relative flex items-center bg-white shadow-md p-4">
        <ArrowLeft class="z-10" />

        <p class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium">
            New event
        </p>
    </nav>
    <div class="grid grid-cols-2 p-4 gap-4">
        <div class="aspect-square bg-gray-600 w-full h-full flex justify-center items-center rounded-lg shadow-sm">
            <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
            class="flex flex-col aspect-square bg-gray-300 w-full h-full flex justify-center items-center rounded-lg shadow-sm">
            <Plus class="w-16 h-16 text-gray-400" />
            <p class="text-gray-400">Add more</p>
        </div>
    </div>
    <div class="p-4">
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="eventName">Event Name</label>
            <input id="eventName" type="text"
                class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. a workshop" />
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Description</label>
            <textarea id="description" rows="3"
                class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe this event"></textarea>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="eventDate">Date and time</label>
            <input type="datetime-local" id="eventDate"
                class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Select date and time" />
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="location">Location</label>
            <select class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2" name="location" id="location">
                <option disabled selected value="volvo">Select location</option>
                <option value="volvo">Salon</option>
                <option value="saab">Atelier</option>
                <option value="mercedes">Living</option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="materials">Materials to bring</label>
            <div class="flex items-center gap-2 mb-2">
                <input id="materials" type="text"
                    class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Add another material" value="paper or sketchbook" />
                <Trash2 class="" />
            </div>
            <div class="flex items-center gap-2 mb-2">
                <input id="materials" type="text"
                    class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Add another material" value="Set of graphite pencils (2H to 6B)" />
                <Trash2 class="" />

            </div>
            <input id="materials" type="text"
                class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Add another material" />
        </div>
         <button
        class="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
      >
        Request event
      </button>
    </div>
</template>
<script lang="ts">
import {
    CircleUserRound,
    Pencil,
    ArrowLeft,
    Image,
    User,
    Award,
    CalendarDays,
    Share2,
    MapPin,
    Check,
    Plus,
    Trash2
} from "lucide-vue-next";

export default {
    components: {
        CircleUserRound,
        Pencil,
        ArrowLeft,
        Image,
        User,
        Award,
        CalendarDays,
        Share2,
        MapPin,
        Check,
        Plus,
        Trash2
    },

    setup() {
        return {};
    },
};
</script>