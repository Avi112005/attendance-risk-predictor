// ============================================
// Attendance Risk Predictor - JavaScript Logic
// ============================================
x = 10
// Theme Management
class ThemeManager {
  constructor() {
    this.html = document.documentElement
    this.toggleBtn = document.getElementById("themeToggle")
    this.initTheme()
    this.setupEventListeners()
  }

  initTheme() {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem("attendanceTheme")

    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Determine which theme to use
    const shouldBeDark = savedTheme === "dark" || (savedTheme === null && prefersDark)

    if (shouldBeDark) {
      this.setDarkMode()
    } else {
      this.setLightMode()
    }
  }

  setupEventListeners() {
    this.toggleBtn.addEventListener("click", () => this.toggleTheme())

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (localStorage.getItem("attendanceTheme") === null) {
        e.matches ? this.setDarkMode() : this.setLightMode()
      }
    })
  }

  toggleTheme() {
    if (this.html.classList.contains("light-mode")) {
      this.setDarkMode()
    } else {
      this.setLightMode()
    }
  }

  setDarkMode() {
    this.html.classList.remove("light-mode")
    this.toggleBtn.setAttribute("aria-label", "Switch to light mode")
    localStorage.setItem("attendanceTheme", "dark")
  }

  setLightMode() {
    this.html.classList.add("light-mode")
    this.toggleBtn.setAttribute("aria-label", "Switch to dark mode")
    localStorage.setItem("attendanceTheme", "light")
  }
}

// Form and Calculation Logic
class AttendanceCalculator {
  constructor() {
    this.form = document.getElementById("attendanceForm")
    this.attendedInput = document.getElementById("attended")
    this.totalInput = document.getElementById("total")
    this.requiredInput = document.getElementById("required")

    this.currentAttendanceDisplay = document.getElementById("currentAttendance")
    this.maxClassesToMissDisplay = document.getElementById("maxClassesToMiss")
    this.riskStatusDisplay = document.getElementById("riskStatus")

    this.breakdownSection = document.getElementById("breakdown")
    this.breakdownAttendance = document.getElementById("breakdownAttendance")
    this.breakdownRequired = document.getElementById("breakdownRequired")
    this.breakdownMargin = document.getElementById("breakdownMargin")

    this.errorMessage = document.getElementById("errorMessage")

    this.setupEventListeners()
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.calculate()
  }

  // Validate inputs and show errors
  validateInputs(attended, total, required) {
    // Check for empty inputs
    if (attended === "" || total === "" || required === "") {
      return { valid: false, error: "Please enter all values." }
    }

    // Convert to numbers
    const attendedNum = Number(attended)
    const totalNum = Number(total)
    const requiredNum = Number(required)

    // Check for NaN
    if (isNaN(attendedNum) || isNaN(totalNum) || isNaN(requiredNum)) {
      return { valid: false, error: "Please enter valid numbers." }
    }

    // Check for negative numbers
    if (attendedNum < 0 || totalNum < 0 || requiredNum < 0) {
      return { valid: false, error: "Values cannot be negative." }
    }

    // Check if attended > total
    if (attendedNum > totalNum) {
      return { valid: false, error: "Classes attended cannot exceed total classes." }
    }

    // Check if total is 0
    if (totalNum === 0) {
      return { valid: false, error: "Total classes must be greater than 0." }
    }

    // Check if required percentage is between 1 and 100
    if (requiredNum < 1 || requiredNum > 100) {
      return { valid: false, error: "Required percentage must be between 1 and 100." }
    }

    return { valid: true }
  }

  // Perform attendance calculations
  calculate() {
    const attended = this.attendedInput.value
    const total = this.totalInput.value
    const required = this.requiredInput.value

    // Validate inputs
    const validation = this.validateInputs(attended, total, required)
    if (!validation.valid) {
      this.showError(validation.error)
      this.resetResults()
      return
    }

    // Clear any previous errors
    this.clearError()

    // Convert to numbers for calculations
    const attendedNum = Number(attended)
    const totalNum = Number(total)
    const requiredNum = Number(required)

    // Calculate current attendance percentage
    const currentAttendance = (attendedNum / totalNum) * 100

    // Calculate maximum classes that can be missed
    // Formula: floor((attended * 100) / requiredPercentage - total)
    const maxClassesToMiss = Math.floor((attendedNum * 100) / requiredNum - totalNum)

    // Clamp negative values to 0 for display
    const displayMaxClasses = Math.max(0, maxClassesToMiss)

    // Determine risk classification
    let riskLevel
    let riskClass
    if (maxClassesToMiss < 0) {
      riskLevel = "Unsafe"
      riskClass = "unsafe"
    } else if (maxClassesToMiss <= 2) {
      riskLevel = "At Risk"
      riskClass = "at-risk"
    } else {
      riskLevel = "Safe"
      riskClass = "safe"
    }

    // Update results display
    this.currentAttendanceDisplay.textContent = currentAttendance.toFixed(2)
    this.maxClassesToMissDisplay.textContent = displayMaxClasses

    this.riskStatusDisplay.textContent = riskLevel
    this.riskStatusDisplay.className = `result-value risk-value ${riskClass}`

    // Update breakdown section
    this.breakdownAttendance.textContent = currentAttendance.toFixed(2) + "%"
    this.breakdownRequired.textContent = requiredNum.toFixed(2) + "%"
    const margin = currentAttendance - requiredNum
    this.breakdownMargin.textContent = margin.toFixed(2) + "%"

    // Show breakdown section
    this.breakdownSection.style.display = "block"
  }

  // Reset results to initial state
  resetResults() {
    this.currentAttendanceDisplay.textContent = "--"
    this.maxClassesToMissDisplay.textContent = "--"
    this.riskStatusDisplay.textContent = "--"
    this.riskStatusDisplay.className = "result-value risk-value"
    this.breakdownSection.style.display = "none"
  }

  // Show error message
  showError(message) {
    this.errorMessage.textContent = message
    this.errorMessage.style.display = "block"
  }

  // Clear error message
  clearError() {
    this.errorMessage.textContent = ""
    this.errorMessage.style.display = "none"
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new AttendanceCalculator()
})