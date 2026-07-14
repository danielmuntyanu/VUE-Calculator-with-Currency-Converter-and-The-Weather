import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMemoryStore } from '../memory-store'

describe('memoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should save a value to memory when "M+" applied', () => {
    const store = useMemoryStore()

    store.storeMemory('123')
    expect(store.getMemory).toEqual('123')

    store.storeMemory('22.567')
    expect(store.getMemory).toEqual('22.567')

    store.storeMemory('-271')
    expect(store.getMemory).toEqual('-271')
  })

  it('should insert a stored value when pressed "MR"', () => {
    const store = useMemoryStore()

    expect(store.getMemory).toBeNull()

    store.storeMemory('74')
    expect(store.getMemory).toEqual('74')

  })

  it('should clear the value when clicked "MC"', () => {
    const store = useMemoryStore()

    expect(store.getMemory).toBeNull()

    store.storeMemory('3.14')
    expect(store.getMemory).toEqual('3.14')

    store.resetMemory()

    expect(store.getMemory).toBeNull()
  })
})
