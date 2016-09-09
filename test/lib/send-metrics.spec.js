'use strict'

const chai = require('chai')
const sinon = require('sinon')

chai.should()

const sendMetrics = require('../../lib/send-metrics')

describe('lib', () => {
  describe('send-metrics', () => {
    describe('when invoked', () => {
      it('then io.emit called', () => {
        const io = { emit: sinon.stub() }
        const span = { os: [], responses: [] }

        sendMetrics(io, span)

        sinon.assert.calledWith(io.emit, 'stats')
      })
    })
  })
})
