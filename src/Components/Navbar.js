import React from 'react'
export default function Navbar(props) {
    const mode = props.mode;
    return (
        <div style={{'position': 'sticky', 'top': 0}}>
              <nav  className={`navbar navbar-${mode}`}>
                <div className={`title-${mode}`}>𝗕𝗹𝘂𝗲𝗖𝗵𝗮𝘁</div>

                <div className="form-check form-switch">
                    <label htmlFor="Toggle_Theme">Enable {mode === 'light-mode' ? 'Dark Mode' : 'Light Mode'}</label>
                    <input
                        onClick={props.toggle}
                        className="form-check-input"
                        name='Toggle_Theme'
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        aria-label="Toggle light/dark mode"
                    />
                </div>
            </nav>
        </div>
    )
}
