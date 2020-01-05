// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/fetch.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

 
  void GitFetch::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

       v8::Local<Object> object = Nan::New<Object>();
  
    Nan::Set(
      target,
      Nan::New("Fetch").ToLocalChecked(),
         object
     );
  }

    