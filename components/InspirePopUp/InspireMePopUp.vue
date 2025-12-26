<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <button class="close-btn" @click="closePopup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <div class="popup-header">
        <!-- Replaced img tag with inline SVG for Intrepid logo -->
       
      </div>
      
      <div class="popup-content">
        <h2>Find Your Perfect Adventure</h2>
        <p>Answer a few questions to get personalized travel recommendations</p>
        
        <form @submit.prevent="handleSubmit" class="quiz-form">
          <!-- Question 1: Age -->
          <div v-if="currentStep === 1" class="question-step">
            <div class="question-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>What's your age?</h3>
            <select v-model="formData.age" class="form-select" required>
              <option value="">Select your age</option>
              <option v-for="age in ageOptions" :key="age" :value="age">{{ age }}</option>
            </select>
          </div>
          
          <!-- Question 2: Budget -->
          <div v-if="currentStep === 2" class="question-step">
            <div class="question-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>What's your budget?</h3>
            <div class="budget-container">
              <input 
                type="range" 
                v-model="formData.budget" 
                min="500" 
                max="5000" 
                step="100"
                class="budget-slider"
              />
              <div class="budget-display">${{ formData.budget }} USD</div>
            </div>
          </div>
          
          <!-- Question 3: Theme -->
          <div v-if="currentStep === 3" class="question-step">
            <div class="question-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>What type of adventure interests you?</h3>
            <select v-model="formData.theme" class="form-select" required>
              <option value="">Select a theme</option>
              <option v-for="theme in themes" :key="theme.value" :value="theme.value">
                {{ theme.label }}
              </option>
            </select>
          </div>
          
          <!-- Question 4: Destination -->
          <div v-if="currentStep === 4" class="question-step">
            <div class="question-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Which destination calls to you?</h3>
            <select v-model="formData.destination" class="form-select" required>
              <option value="">Select a destination</option>
              <option v-for="country in countries" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>
          
          <div class="form-actions">
            <button 
              v-if="currentStep > 1" 
              type="button" 
              @click="previousStep" 
              class="btn-secondary"
            >
              Previous
            </button>
            <button 
              v-if="currentStep < 4" 
              type="button" 
              @click="nextStep" 
              class="btn-primary"
              :disabled="!canProceed"
            >
              Next
            </button>
            <button 
              v-if="currentStep === 4" 
              type="submit" 
              class="btn-submit"
              :disabled="!canProceed"
            >
              Suggest me a destination
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const currentStep = ref(1)
const formData = ref({
  age: '',
  budget: 1500,
  theme: '',
  destination: ''
})

const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1)

const themes = [
  { value: '18-35s', label: '18 to 35s' },
  { value: 'multi-active', label: 'Multi-active' },
  { value: 'camping', label: 'Camping' },
  { value: 'cruises', label: 'Cruises' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'expeditions', label: 'Expeditions' },
  { value: 'explorer', label: 'Explorer' },
  { value: 'family', label: 'Family' },
  { value: 'festival', label: 'Festival' },
  { value: 'food', label: 'Food' },
  { value: 'long-trips', label: 'Long trips' },
  { value: 'polar', label: 'Polar' },
  { value: 'rail', label: 'Rail' },
  { value: 'sailing', label: 'Sailing' },
  { value: 'short-breaks', label: 'Short breaks' },
  { value: 'solo-travel', label: 'Solo travel' },
  { value: 'tailor-made', label: 'Tailor-Made travel' },
  { value: 'urban-adventures', label: 'Urban Adventures' },
  { value: 'walking-trekking', label: 'Walking & trekking' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'womens-expeditions', label: "Women's Expeditions" }
]

const countries = [
  'Australia', 'Japan', 'Thailand', 'Vietnam', 'India', 'Nepal', 'China', 'Indonesia',
  'Italy', 'France', 'Spain', 'Greece', 'Turkey', 'Morocco', 'Egypt', 'Kenya',
  'Tanzania', 'South Africa', 'Peru', 'Bolivia', 'Chile', 'Argentina', 'Brazil',
  'Mexico', 'Guatemala', 'Costa Rica', 'United States', 'Canada', 'Iceland',
  'Norway', 'Russia', 'Mongolia', 'Jordan', 'Iran', 'Uzbekistan', 'Madagascar'
]

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return formData.value.age !== ''
    case 2: return formData.value.budget >= 500
    case 3: return formData.value.theme !== ''
    case 4: return formData.value.destination !== ''
    default: return false
  }
})

const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const closePopup = () => {
  emit('close')
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // Here you would typically send the data to a backend service
  alert('Thank you! We\'ll suggest the perfect destination for you based on your preferences.')
  closePopup()
}
</script>

<style scoped>
@import './inspire-popup.css';
</style>
