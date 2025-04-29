// DOM Elements
const cropForm = document.getElementById('cropForm');
const recommendBtn = document.getElementById('recommendBtn');
const resultsSection = document.getElementById('results');
const regionNameEl = document.getElementById('regionName');
const seasonRangeEl = document.getElementById('seasonRange');
const bestCropsEl = document.getElementById('bestCrops');
const goodCropsEl = document.getElementById('goodCrops');
const averageCropsEl = document.getElementById('averageCrops');
const cashCropsTable = document.getElementById('cashCropsTable').querySelector('tbody');
const foodCropsTable = document.getElementById('foodCropsTable').querySelector('tbody');

// Dropdown Options
const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
];

const soilTypes = [
    { value: 'clay', name: 'Clay' },
    { value: 'sandy', name: 'Sandy' },
    { value: 'loamy', name: 'Loamy' },
    { value: 'silty', name: 'Silty' },
    { value: 'peaty', name: 'Peaty' },
    { value: 'chalky', name: 'Chalky' }
];

const nutrientLevels = [
    { value: 'low', name: 'Low' },
    { value: 'medium', name: 'Medium' },
    { value: 'high', name: 'High' }
];

const waterAvailabilityOptions = [
    { value: 'low', name: 'Low (Limited irrigation)' },
    { value: 'medium', name: 'Medium (Seasonal rainfall)' },
    { value: 'high', name: 'High (Ample irrigation/rainfall)' }
];

// Initialize Form
function initializeForm() {
    const startMonthSelect = document.getElementById('startMonth');
    const endMonthSelect = document.getElementById('endMonth');
    const soilTypeSelect = document.getElementById('soilType');
    const nitrogenSelect = document.getElementById('nitrogen');
    const phosphorusSelect = document.getElementById('phosphorus');
    const potassiumSelect = document.getElementById('potassium');
    const waterAvailabilitySelect = document.getElementById('waterAvailability');

    // Populate month dropdowns
    months.forEach(month => {
        startMonthSelect.appendChild(createOption(month.value, month.name));
        endMonthSelect.appendChild(createOption(month.value, month.name));
    });

    // Set default months (e.g., April to September)
    startMonthSelect.value = 4;
    endMonthSelect.value = 9;

    // Populate soil type dropdown
    soilTypes.forEach(soil => {
        soilTypeSelect.appendChild(createOption(soil.value, soil.name));
    });

    // Populate nutrient dropdowns
    nutrientLevels.forEach(level => {
        nitrogenSelect.appendChild(createOption(level.value, level.name));
        phosphorusSelect.appendChild(createOption(level.value, level.name));
        potassiumSelect.appendChild(createOption(level.value, level.name));
    });

    // Set default nutrient levels to medium
    nitrogenSelect.value = 'medium';
    phosphorusSelect.value = 'medium';
    potassiumSelect.value = 'medium';

    // Populate water availability dropdown
    waterAvailabilityOptions.forEach(option => {
        waterAvailabilitySelect.appendChild(createOption(option.value, option.name));
    });

    // Set default water availability to medium
    waterAvailabilitySelect.value = 'medium';
}

function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    
    recommendBtn.addEventListener('click', () => {
        // Get form values
        const formData = {
            region: document.getElementById('region').value || 'your region',
            startMonth: parseInt(document.getElementById('startMonth').value),
            endMonth: parseInt(document.getElementById('endMonth').value),
            minTemp: parseFloat(document.getElementById('minTemp').value) || 20,
            maxTemp: parseFloat(document.getElementById('maxTemp').value) || 30,
            rainfall: parseFloat(document.getElementById('rainfall').value) || 800,
            humidity: parseFloat(document.getElementById('humidity').value) || 60,
            soilType: document.getElementById('soilType').value,
            nitrogen: document.getElementById('nitrogen').value,
            phosphorus: document.getElementById('phosphorus').value,
            potassium: document.getElementById('potassium').value,
            waterAvailability: document.getElementById('waterAvailability').value
        };

        // Validate inputs
        if (isNaN(formData.minTemp) || isNaN(formData.maxTemp) || 
            isNaN(formData.rainfall) || isNaN(formData.humidity)) {
            alert('Please enter valid numbers for all environmental parameters');
            return;
        }

        // Update results header
        regionNameEl.textContent = formData.region;
        seasonRangeEl.textContent = `${getMonthName(formData.startMonth)} to ${getMonthName(formData.endMonth)}`;

        // Get recommendations
        const recommendations = getCropRecommendations(formData);

        // Display recommendations
        displayRecommendations(recommendations);

        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Helper Functions
function getMonthName(monthNumber) {
    const month = months.find(m => m.value === monthNumber);
    return month ? month.name : '';
}

// Crop Recommendation Logic
function getCropRecommendations(params) {
    // Calculate average temperature
    const avgTemp = (params.minTemp + params.maxTemp) / 2;
    
    // Determine climate type
    let climate = '';
    if (avgTemp < 10) {
        climate = 'cold';
    } else if (avgTemp >= 10 && avgTemp < 20) {
        climate = 'temperate';
    } else {
        climate = 'warm';
    }
    
    // Determine moisture level
    let moisture = '';
    if (params.rainfall < 500) {
        moisture = 'dry';
    } else if (params.rainfall >= 500 && params.rainfall < 1000) {
        moisture = 'moderate';
    } else {
        moisture = 'wet';
    }
    
    // This would be replaced with actual data from an API or more sophisticated algorithm
    // For now, we'll use a simplified version
    const allCrops = [
        // Best suited crops
        {
            name: 'Rice',
            type: 'food',
            category: 'best',
            description: 'Thrives in warm, wet conditions with clay or loamy soil',
            suitability: 'High',
            growingPeriod: '4-6 months',
            waterNeeds: 'High',
            soilPreference: 'Clay, Loamy'
        },
        {
            name: 'Wheat',
            type: 'food',
            category: 'best',
            description: 'Grows well in temperate climates with moderate rainfall',
            suitability: 'High',
            growingPeriod: '3-4 months',
            waterNeeds: 'Medium',
            soilPreference: 'Loamy, Silty'
        },
        {
            name: 'Cotton',
            type: 'cash',
            category: 'best',
            description: 'Prefers warm temperatures and moderate water availability',
            suitability: 'High',
            growingPeriod: '5-6 months',
            waterNeeds: 'Medium',
            soilPreference: 'Sandy, Loamy'
        },
        
        // Good options
        {
            name: 'Maize',
            type: 'food',
            category: 'good',
            description: 'Adaptable to various conditions but prefers warm temperatures',
            suitability: 'Good',
            growingPeriod: '3-4 months',
            waterNeeds: 'Medium',
            soilPreference: 'Loamy, Silty'
        },
        {
            name: 'Soybean',
            type: 'cash',
            category: 'good',
            description: 'Does well in moderate climates with good soil nutrients',
            suitability: 'Good',
            growingPeriod: '3-5 months',
            waterNeeds: 'Medium',
            soilPreference: 'Loamy, Silty'
        },
        {
            name: 'Potatoes',
            type: 'food',
            category: 'good',
            description: 'Prefers cooler temperatures and well-drained soil',
            suitability: 'Good',
            growingPeriod: '3-4 months',
            waterNeeds: 'Medium',
            soilPreference: 'Sandy, Loamy'
        },
        
        // Average suitability
        {
            name: 'Coffee',
            type: 'cash',
            category: 'average',
            description: 'Requires specific altitude and temperature conditions',
            suitability: 'Moderate',
            growingPeriod: '9-11 months',
            waterNeeds: 'High',
            soilPreference: 'Loamy, Peaty'
        },
        {
            name: 'Tea',
            type: 'cash',
            category: 'average',
            description: 'Needs consistent rainfall and acidic soil',
            suitability: 'Moderate',
            growingPeriod: 'Continuous',
            waterNeeds: 'High',
            soilPreference: 'Loamy, Peaty'
        },
        {
            name: 'Bananas',
            type: 'food',
            category: 'average',
            description: 'Requires warm temperatures and high water availability',
            suitability: 'Moderate',
            growingPeriod: '9-12 months',
            waterNeeds: 'High',
            soilPreference: 'Loamy, Silty'
        }
    ];
    
    // Filter crops based on some simple rules (this is simplified)
    // In a real app, this would be more sophisticated
    const recommendedCrops = {
        best: allCrops.filter(crop => crop.category === 'best'),
        good: allCrops.filter(crop => crop.category === 'good'),
        average: allCrops.filter(crop => crop.category === 'average')
    };
    
    return recommendedCrops;
}

// Display Functions
function displayRecommendations(recommendations) {
    // Clear previous recommendations
    bestCropsEl.innerHTML = '';
    goodCropsEl.innerHTML = '';
    averageCropsEl.innerHTML = '';
    cashCropsTable.innerHTML = '';
    foodCropsTable.innerHTML = '';
    
    // Display crops in their respective categories
    displayCropCategory(recommendations.best, bestCropsEl);
    displayCropCategory(recommendations.good, goodCropsEl);
    displayCropCategory(recommendations.average, averageCropsEl);
    
    // Add crops to tables
    [...recommendations.best, ...recommendations.good, ...recommendations.average].forEach(crop => {
        addToTable(crop);
    });
}

function displayCropCategory(crops, container) {
    crops.forEach(crop => {
        const cropCard = createCropCard(crop);
        container.appendChild(cropCard);
    });
}

function createCropCard(crop) {
    const card = document.createElement('div');
    card.className = 'crop-card';
    
    const name = document.createElement('div');
    name.className = 'crop-name';
    name.textContent = crop.name;
    
    const details = document.createElement('div');
    details.className = 'crop-details';
    details.textContent = crop.description;
    
    card.appendChild(name);
    card.appendChild(details);
    
    return card;
}

function addToTable(crop) {
    const table = crop.type === 'cash' ? cashCropsTable : foodCropsTable;
    
    const row = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = crop.name;
    
    const suitabilityCell = document.createElement('td');
    suitabilityCell.textContent = crop.suitability;
    
    const periodCell = document.createElement('td');
    periodCell.textContent = crop.growingPeriod;
    
    const waterCell = document.createElement('td');
    waterCell.textContent = crop.waterNeeds;
    
    const soilCell = document.createElement('td');
    soilCell.textContent = crop.soilPreference;
    
    row.appendChild(nameCell);
    row.appendChild(suitabilityCell);
    row.appendChild(periodCell);
    row.appendChild(waterCell);
    row.appendChild(soilCell);
    
    table.appendChild(row);
}