import React, { Component } from 'react'
import SimplexNoise from 'simplex-noise'
import Victor from 'victor'
import styles from '../styles/pages/Home.module.css'

//A huge thank you to Tadas Karpavičius for creating this amazing code/art (@trajektorijus on CodePen)
//this is code that I modified but relied heavily on existing code from Tadas in their CodePen project and would not be possible without them.

export default class Waves extends Component {
	componentDidMount() {
		const _color = this.props.color
		console.clear()
		class Utils {
			static randomRange(min, max) {
				return Math.random() * (max - min) + min
			}

			static mapRange(value, inputMin, inputMax, outputMin, outputMax, clamp) {
				if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
					return outputMin;
				} else {
					var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
					if (clamp) {
						if (outputMax < outputMin) {
							if (outVal < outputMax) outVal = outputMax;
							else if (outVal > outputMin) outVal = outputMin;
						} else {
							if (outVal > outputMax) outVal = outputMax;
							else if (outVal < outputMin) outVal = outputMin;
						}
					}
					return outVal;
				}
			}
		}

		Utils.simplex = new SimplexNoise(666)

		class Particle {
			constructor(pos, color) {
				this.pos = pos
				this.pastPos = pos.clone()
				this.color = color
			}

			update(newPos, pastPos, newColor) {
				this.pastPos.copy(pastPos || this.pos)
				this.pos.copy(newPos)
				this.color = newColor

				return this
			}

			draw(ctx) {
				ctx.beginPath()
				ctx.moveTo(this.pastPos.x, this.pastPos.y)
				ctx.lineTo(this.pos.x, this.pos.y)
				ctx.strokeStyle = this.color
				ctx.stroke()

				return this
			}
		}

		class App {
			config = {
				bgColor: _color,
				numOfParticles: 1000,
				nZoom: 300,
				particleLength: 90,
				speed: 6
			}

			constructor() {
				this.canvas = document.getElementById('c')
				this.ctx = this.canvas.getContext('2d')

				this.shadowCanvas = document.createElement('canvas')
				this.shadowCtx = this.shadowCanvas.getContext('2d')

				this.setUpVars()
				this.setUpListeners()

				this.particles = this.getParticles()

				this.update()
			}

			getParticles() {
				const particles = []

				for (let i = 0; i < this.config.numOfParticles; i++) {
					particles.push(new Particle(
						new Victor(this.wWidth * Math.random(), this.wHeight * Math.random()),
						'#000'
					))
				}
				return particles
			}

			setUpVars() {
				this.canvas.width = this.shadowCanvas.width = this.wWidth = window.innerWidth
				this.canvas.height = this.shadowCanvas.height = this.wHeight = window.innerHeight
				this.wCenterX = this.wWidth / 2
				this.wCenterY = this.wHeight / 2
				this.wHypot = Math.hypot(this.wWidth, this.wHeight)
				this.wMin = Math.min(this.wWidth, this.wHeight)

				this.particles = this.getParticles()
			}

			setUpListeners() {
				window.addEventListener('resize', this.setUpVars.bind(this))
			}

			isWithinBounds(x, y) {
				let answer = true

				if (x < 0 || x > this.wWidth || y < 0 || y > this.wHeight) {
					answer = false
				}

				return answer
			}

			draw(ctx) {
				ctx.save()
				ctx.globalAlpha = 0.1
				ctx.fillStyle = this.config.bgColor
				ctx.fillRect(0, 0, this.wWidth, this.wHeight)
				ctx.restore()

				ctx.save()
				ctx.globalAlpha = 0.1
				this.particles.forEach(p => p.draw(ctx))
				ctx.restore()
			}

			update(timestamp) {
				if (timestamp) {
					this.timestamp = timestamp / (5000 + ((1 - this.config.speed) * 15000))
					const nZoom = this.config.nZoom * (1 + (1 + Math.sin(this.timestamp) / 2))

					this.particles.forEach(p => {
						const noise = Utils.simplex.noise3D(p.pos.x / nZoom, p.pos.y / nZoom, this.timestamp)
						const angle = Math.PI * noise
						const angleSin = Math.sin(angle)
						const angleCos = Math.cos(angle)
						const newX = p.pos.x + (angleSin * this.config.particleLength)
						const newY = p.pos.y + (angleCos * this.config.particleLength)
						let newPos, pastPos, newColor

						newColor = 'hsl(' + (350 + Math.floor(noise * 100)) + ', 100%, 50%)'

						if (!this.isWithinBounds(p.pos.x, p.pos.y)) {
							newPos = new Victor(this.wWidth * Math.random(), this.wHeight * Math.random())
							pastPos = new Victor(newPos.x, newPos.y)
						} else {
							newPos = new Victor(newX, newY)
						}

						p.update(newPos, pastPos, newColor)
					})

					this.draw(this.shadowCtx)
				}
				this.ctx.clearRect(0, 0, this.wWidth, this.wHeight)
				this.ctx.drawImage(this.shadowCanvas, 0, 0)

				window.requestAnimationFrame(this.update.bind(this))
			}
		}

		new App()
	}
	render() {
		return (
			<canvas id="c" className={styles.waves}></canvas>
		)
	}
}