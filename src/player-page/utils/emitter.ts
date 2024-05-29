import mitt from 'mitt'

type Events = {
  title: string
}

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter
