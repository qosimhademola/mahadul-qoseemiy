// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

// For live-class.html - Zoom Meeting Integration
function initializeZoomMeeting() {
    // Check if we're on the live class page
    if (!document.getElementById('zoom-meeting-container')) return;

    const startZoomBtn = document.getElementById('start-zoom-btn');
    const meetingPlaceholder = document.getElementById('meeting-placeholder');

    if (startZoomBtn) {
        startZoomBtn.addEventListener('click', function() {
            // Hide placeholder
            meetingPlaceholder.classList.add('hidden');
            
            // Initialize Zoom meeting
            startZoomMeeting();
        });
    }
}

// Zoom Meeting SDK Configuration
function startZoomMeeting() {
    // For security, these values should come from your backend
    // Never hardcode credentials in frontend code
    const zoomConfig = {
        meetingNumber: '1234567890', // This should be dynamic from your backend
        userName: 'Student', // Get from user profile
        passWord: '', // Meeting password if required
        sdkKey: 'YOUR_ZOOM_SDK_KEY', // Get from Zoom developer dashboard
        signature: 'GENERATED_SIGNATURE', // Generate from backend
        leaveUrl: window.location.href,
        role: 0 // 0 for participant, 1 for host
    };

    // Load Zoom Meeting SDK
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.0/lib', '/av');
    
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    
    // Configure Zoom Meeting
    ZoomMtg.init({
        leaveUrl: zoomConfig.leaveUrl,
        success: function() {
            ZoomMtg.join({
                meetingNumber: zoomConfig.meetingNumber,
                userName: zoomConfig.userName,
                signature: zoomConfig.signature,
                sdkKey: zoomConfig.sdkKey,
                passWord: zoomConfig.passWord,
                success: function(res) {
                    console.log('Zoom meeting joined successfully');
                },
                error: function(err) {
                    console.error('Zoom meeting join error', err);
                    // Show error message to user
                    alert('Failed to join meeting. Please try again.');
                    meetingPlaceholder.classList.remove('hidden');
                }
            });
        },
        error: function(err) {
            console.error('Zoom initialization error', err);
            alert('Failed to initialize Zoom. Please try again.');
            meetingPlaceholder.classList.remove('hidden');
        }
    });
}

// Call the initialization function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeZoomMeeting();
});