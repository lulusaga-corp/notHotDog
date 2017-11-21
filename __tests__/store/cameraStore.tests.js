import * as camera from '../../src/modules/camera';

/* TESTING REDUCER */
describe('camera reducer', () => {
  it('should return the initial state', () => {
    expect(camera.default(undefined, {})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should toggle gallery display state', () => {
    expect(camera.default(undefined, {type: camera.SHOW_GALLERY})).toEqual({
      cameraType: 'back',
      showGallery: true,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should toggle which camera is used', () => {
    expect(camera.default(undefined, {type: camera.TOGGLE_FACING, payload: 'front'})).toEqual({
      cameraType: 'front',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should change the flash status', () => {
    expect(camera.default(undefined, {type: camera.TOGGLE_FLASH, payload: 'on'})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'on',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should change the white balance', () => {
    expect(camera.default(undefined, {type: camera.TOGGLE_WB, payload: 'sunny'})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'sunny',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should turn off the autoFocus', () => {
    expect(camera.default(undefined, {type: camera.TOGGLE_AUTOFOCUS, payload: 'off'})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'off',
      depth: 0,
      zoom: 0
    })
  })

  it('should return the initial state', () => {
    expect(camera.default(undefined, {})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0
    })
  })

  it('should adjust the focus', () => {
    expect(camera.default(undefined, {type: camera.SET_FOCUS, payload: 0.2})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'off',
      depth: 0.2,
      zoom: 0
    })
  })

  it('should adjust the zoom', () => {
    expect(camera.default(undefined, {type: camera.CHANGE_ZOOM, payload: 0.3})).toEqual({
      cameraType: 'back',
      showGallery: false,
      flash: 'off',
      wb: 'auto',
      autoFocus: 'on',
      depth: 0,
      zoom: 0.3
    })
  })

})