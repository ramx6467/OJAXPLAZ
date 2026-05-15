const generateAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256&font-size=0.33`;

export const heroCategories = [
  {
    id: "telugu",
    title: "Telugu Actors",
    heroes: [
      { id: "pawan-kalyan", name: "Pawan Kalyan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Shri_Konidela_Pawan_Kalyan.jpg/500px-Shri_Konidela_Pawan_Kalyan.jpg", imagePosition: "center 15%" },
      { id: "allu-arjun", name: "Allu Arjun", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Allu_Arjun_at_Pushpa_2_The_Rule_meet.jpg/500px-Allu_Arjun_at_Pushpa_2_The_Rule_meet.jpg" },
      { id: "mahesh-babu", name: "Mahesh Babu", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg/500px-Mahesh_Babu_in_Spyder_%28cropped%29.jpg" },
      { id: "prabhas", name: "Prabhas", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Prabhas_by_Gage_Skidmore.jpg/500px-Prabhas_by_Gage_Skidmore.jpg" },
      { id: "ram-charan", name: "Ram Charan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ram_Charan_at_Game_Changer_trailer_launch.jpg/500px-Ram_Charan_at_Game_Changer_trailer_launch.jpg", imagePosition: "center 20%" },
      { id: "jr-ntr", name: "Jr NTR", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/NTR_Jr._%282026%29.jpg/500px-NTR_Jr._%282026%29.jpg" },
      { id: "nani", name: "Nani", searchQuery: "Nani Telugu", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nani_at_an_interview_for_film_companion_%28cropped%29.png/500px-Nani_at_an_interview_for_film_companion_%28cropped%29.png" },
      { id: "vijay-deverakonda", name: "Vijay Deverakonda", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vijay_Deverakonda_at_NOTA_pressmeet_2_%28cropped%29.jpg/500px-Vijay_Deverakonda_at_NOTA_pressmeet_2_%28cropped%29.jpg" }
    ]
  },
  {
    id: "hindi",
    title: "Hindi Actors",
    heroes: [
      { id: "shah-rukh-khan", name: "Shah Rukh Khan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg" },
      { id: "salman-khan", name: "Salman Khan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Salman_Khan_in_2023_%281%29_%28cropped%29.jpg/500px-Salman_Khan_in_2023_%281%29_%28cropped%29.jpg" },
      { id: "hrithik-roshan", name: "Hrithik Roshan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Hrithik_Roshan_in_2024_%28cropped%29.jpg" },
      { id: "ranbir-kapoor", name: "Ranbir Kapoor", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ranbir_Kapoor_snapped_at_Kalina_airport.jpg" },
      { id: "ranveer-singh", name: "Ranveer Singh", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/Ranveer_Singh_in_2023_%281%29_%28cropped%29.jpg" },
      { id: "aamir-khan", name: "Aamir Khan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Aamir_Khan_at_the_success_bash_of_Secret_Superstar.jpg" }
    ]
  },
  {
    id: "tamil",
    title: "Tamil Actors",
    heroes: [
      { id: "vijay", name: "Vijay", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Vijay_at_Protest_of_the_Nadigar_Sangam.jpg/500px-Vijay_at_Protest_of_the_Nadigar_Sangam.jpg" },
      { id: "ajith-kumar", name: "Ajith Kumar", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ajith_Kumar_at_Irungattukottai_Race_Track.jpg/500px-Ajith_Kumar_at_Irungattukottai_Race_Track.jpg" },
      { id: "rajinikanth", name: "Rajinikanth", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Rajinikanth_in_2019.jpg/500px-Rajinikanth_in_2019.jpg" },
      { id: "surya", name: "Suriya", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Retro_audio_launch_-_Suriya.jpg/500px-Retro_audio_launch_-_Suriya.jpg" },
      { id: "kamal-haasan", name: "Kamal Haasan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kamal_Haasan_at_2023_San_Diego_Comic-Con_International_by_Gage_Skidmore%2C_005_%28cropped%29.jpg/500px-Kamal_Haasan_at_2023_San_Diego_Comic-Con_International_by_Gage_Skidmore%2C_005_%28cropped%29.jpg" },
      { id: "dhanush", name: "Dhanush", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dhanush_at_the_%E2%80%98Asuran%E2%80%99_Success_Meet_%28cropped%29.jpg/500px-Dhanush_at_the_%E2%80%98Asuran%E2%80%99_Success_Meet_%28cropped%29.jpg" }
    ]
  },
  {
    id: "kannada",
    title: "Kannada Actors",
    heroes: [
      { id: "yash", name: "Yash", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Yash%2C_Vishal%2C_Srinidhi_Shetty_at_the_%E2%80%98KGF%E2%80%99_Press_Meet_In_Chennai_%28cropped%29.jpg" },
      { id: "puneeth-rajkumar", name: "Puneeth Rajkumar", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Puneeth_Rajkumar_%281%29.jpg" },
      { id: "sudeep", name: "Sudeep", searchQuery: "Kiccha Sudeep", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sudeep_interview_TeachAIDS.jpg/500px-Sudeep_interview_TeachAIDS.jpg" },
      { id: "darshan", name: "Darshan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Darshan_%28Kannada_actor%29_March_2024_%2801%29.jpg" },
      { id: "rakshit-shetty", name: "Rakshit Shetty", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/RakshitShetty.jpg/500px-RakshitShetty.jpg" }
    ]
  },
  {
    id: "malayalam",
    title: "Malayalam Actors",
    heroes: [
      { id: "mohanlal", name: "Mohanlal", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mohanlal_Viswanathan_BNC.jpg/500px-Mohanlal_Viswanathan_BNC.jpg" },
      { id: "mammootty", name: "Mammootty", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Mammootty%2C_2022.jpg/500px-Mammootty%2C_2022.jpg" },
      { id: "fahadh-faasil", name: "Fahadh Faasil", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Fahadh_Faasil_2019.jpg/500px-Fahadh_Faasil_2019.jpg" },
      { id: "dulquer-salmaan", name: "Dulquer Salmaan", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Dulquer_Salmaan_at_Karwaan_promotions_%28cropped%29.jpg" },
      { id: "prithviraj", name: "Prithviraj", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Prithviraj_at_Aiyyaa_event.jpg" }
    ]
  },
  {
    id: "hollywood",
    title: "Hollywood Actors",
    heroes: [
      { id: "tom-cruise", name: "Tom Cruise", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tom_Cruise_at_53rd_Saturn_Awards_2026-01.jpg/500px-Tom_Cruise_at_53rd_Saturn_Awards_2026-01.jpg" },
      { id: "leonardo-dicaprio", name: "Leonardo DiCaprio", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/LeoPTABFI191125-28_%28cropped%29.jpg/500px-LeoPTABFI191125-28_%28cropped%29.jpg" },
      { id: "brad-pitt", name: "Brad Pitt", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/500px-Brad_Pitt-69858.jpg" },
      { id: "robert-downey-jr", name: "Robert Downey Jr", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg/500px-Robert_Downey_Jr._2014_Comic-Con.jpg" },
      { id: "chris-hemsworth", name: "Chris Hemsworth", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chris_Hemsworth_-_Crime_101.jpg/500px-Chris_Hemsworth_-_Crime_101.jpg" },
      { id: "keanu-reeves", name: "Keanu Reeves", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg/500px-Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg" }
    ]
  }
];
