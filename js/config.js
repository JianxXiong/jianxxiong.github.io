/**
 * Configuration file for the academic homepage
 * Set the value to false to hide a section, true to show it
 */
const siteConfig = {
    // Personal information sections
    about: true,           // About Me section
    research: false,       // Research Interests section
    publications: false,    // Publications section
    projects: false,       // Research Projects section
    education: true,       // Education section
    patents: true,         // Patents section
    awards: true,          // Awards & Honors section
    
    // Contact information in header
    contactInfo: {
        email: true,        // Email address link
        github: false,      // GitHub profile link - now hidden
        googleScholar: false, // Google Scholar profile link - now hidden
        cv: true,           // CV/Resume PDF link
        // Add more contact options here if needed in the future
    },
    
    // Navigation bar - will automatically hide nav links for hidden sections
    showNavigation: false    // Show/hide entire navigation bar (默认隐藏)
}; 