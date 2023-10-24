const medicalRecordProperties = [
    'chronicConditions',
    'surgeries',
    'allergies',
    'familyHistory',
    'lifestyle',
  ];

  export const medicationOptions = [
    'Metformin',
    'Lisinopril',
    'Simvastatin',
    'Albuterol',
    'Levothyroxine',
    'Warfarin',
    'Aspirin',
    'Prednisone',
    'Hydrochlorothiazide',
    'Ranitidine',
    'Clopidogrel',
    'Omeprazole',
    'Atorvastatin',
    'Metoprolol',
    'Gabapentin',
    'Amlodipine',
    'Sertraline',
    'Escitalopram',
    'Venlafaxine',
    'Duloxetine'
  ];
  export const conditionsOptions = [
    'Alzheimer’s Disease',
    'Anxiety',
    'Arthritis',
    'Asthma',
    'Attention Deficit Hyperactivity Disorder (ADHD)',
    'Autism Spectrum Disorder',
    'Bipolar Disorder',
    'Cancer',
    'Chronic Fatigue Syndrome',
    'Chronic Kidney Disease',
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Crohn’s Disease',
    'Depression',
    'Diabetes',
    'Eating Disorders (Anorexia, Bulimia, Binge Eating)',
    'Endometriosis',
    'Fibromyalgia',
    'Gastroesophageal Reflux Disease (GERD)',
    'Hepatitis',
    'Heart Disease',
    'HIV/AIDS',
    'Hypertension (High Blood Pressure)',
    'Hyperlipidemia (High Cholesterol)',
    'Irritable Bowel Syndrome (IBS)',
    'Lupus',
    'Migraine',
    'Multiple Sclerosis',
    'Obsessive-Compulsive Disorder (OCD)',
    'Osteoporosis',
    'Panic Disorder',
    'Parkinson’s Disease',
    'Post-Traumatic Stress Disorder (PTSD)',
    'Postpartum Depression',
    'Rheumatoid Arthritis',
    'Schizophrenia',
    'Sleep Apnea',
    'Social Anxiety Disorder',
    'Stroke',
    'Thyroid Disorders',
    'Ulcerative Colitis',
  ];
  
  
  const medicalRecordOptions = medicalRecordProperties.map(property => {
    if(property==='chronicConditions' )
        return {
            name: property,
            value: property,
            label: 'Chronic Conditions', // Capitalize the first letter
          };
    if(property==='familyHistory' )
        return {
            name: property,
            value: property,
            label: 'Family History', // Capitalize the first letter
          };     
    return {
      name: property,
      value: property,
      label: property.charAt(0).toUpperCase() + property.slice(1), // Capitalize the first letter
    };
  });

  export default medicalRecordOptions;