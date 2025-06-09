<template>
    <nav class="relative flex items-center p-4 bg-alphaYellow">
        <ArrowLeft class="z-10" />

        <p class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium">
            Create event
        </p>
    </nav>

    <div class="p-4 mt-4">
        <div class="mb-6">
            <div class="grid grid-cols-2 gap-2">
                <div class="aspect-square bg-gray-600 w-full h-full flex justify-center items-center">
                    <Image class="w-16 h-16 text-gray-400" />
                </div>
                <div
                    class="flex flex-col aspect-square bg-gray-300 w-full h-full justify-center items-center">
                    <Plus class="w-16 h-16 text-gray-400" />
                    <p class="text-gray-400">Add photos</p>
                </div>
            </div>
        </div>

        <div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2" for="eventName">Event Name</label>
                <input id="eventName" type="text"
                    class="w-full border border-alphaDark  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Painting with Tiffany" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2" for="description">Description</label>
                <textarea id="description" rows="3"
                    class="w-full border border-alphaDark  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe this event"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2" for="eventDate">Date and time</label>
                <input type="datetime-local" id="eventDate"
                    class="w-full border border-alphaDark  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Select date and time" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1" for="location">Location</label>
                <select class="w-full border border-alphaDark  px-4 py-2" name="location" id="location">
                    <option disabled selected value="volvo">Select location</option>
                    <option value="volvo">Salon</option>
                    <option value="saab">Atelier</option>
                    <option value="mercedes">Living</option>
                </select>
            </div>

            <!-- <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="materials">Materials to bring</label>
                <div class="flex items-center gap-2 mb-2">
                    <input id="materials" type="text"
                        class="w-full border border-alphaDark  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Add another material" value="paper or sketchbook" />
                    <Trash2 class="" />
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <input id="materials" type="text"
                        class="w-full border border-alphaDark  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Add another material" value="Set of graphite pencils (2H to 6B)" />
                    <Trash2 class="" />
        
                </div>
                <input id="materials" type="text"
                    class="w-full border bg-white border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Add another material" />
            </div> -->

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="materials">Materials to bring</label>

                <!-- List of materials -->
                <div v-for="(material, index) in materials" :key="index" class="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        v-model="materials[index]"
                        class="w-full border border-alphaDark px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Material"
                    />
                    <Trash2 class="cursor-pointer" @click="removeMaterial(index)" />
                </div>

                <!-- Add new materials -->
                 <div class="flex items-center justify-between">
                     <input
                         v-model="newMaterial"
                         @keyup.enter="addMaterial"
                         type="text"
                         class="w-full border bg-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                         placeholder="Add another material"
                     />
                     <Plus class="w-8 h-8 ml-4 text-gray-600 cursor-pointer" @click="addMaterial" />
                 </div>
            </div>

            <button class="w-full bg-alphaGreen py-2.5 px-5 hover:bg-primary-700 transition-colors duration-200">
                Request event
            </button>
        </div>
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

import { ref } from 'vue'

const materials = ref([
    'paper or sketchbook',
    'Set of graphite pencils (2H to 6B)'
])

const newMaterial = ref('')

function addMaterial() {
    const trimmed = newMaterial.value.trim()
    if (trimmed !== '') {
        materials.value.push(trimmed)
        newMaterial.value = ''
    }
}

function removeMaterial(index: number) {
    materials.value.splice(index, 1)
}

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
        return {
            materials,
            newMaterial,
            addMaterial,
            removeMaterial
        };
    },

    
};
</script>