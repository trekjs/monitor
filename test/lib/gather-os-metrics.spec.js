'use strict'

const chai = require('chai')

chai.should()

const gatherOsMetrics = require('../../lib/gather-os-metrics')

describe('lib', () => {
  describe('gather-os-metrics', () => {
    describe('when invoked', () => {
      it('then ...', () => {
        const span = { os: [], responses: [] }

        gatherOsMetrics({}, span)

        // todo: not sure what should I test, maybe the resulted span structure?
        // todo: also this component has got some internal timing events?
      })
    })
  })
})
