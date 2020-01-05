// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/checkout_perfdata.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitCheckoutPerfdata::~GitCheckoutPerfdata() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitCheckoutPerfdata::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("CheckoutPerfdata").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "mkdirCalls", MkdirCalls);
         Nan::SetPrototypeMethod(tpl, "statCalls", StatCalls);
         Nan::SetPrototypeMethod(tpl, "chmodCalls", ChmodCalls);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("CheckoutPerfdata").ToLocalChecked(), _constructor_template);
  }

      // start field block
    NAN_METHOD(GitCheckoutPerfdata::MkdirCalls) {
      v8::Local<v8::Value> to;

            size_t
           mkdir_calls =
          Nan::ObjectWrap::Unwrap<GitCheckoutPerfdata>(info.This())->GetValue()->mkdir_calls;
 // start convert_to_v8 block
     to = Nan::New<Number>( mkdir_calls);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitCheckoutPerfdata::StatCalls) {
      v8::Local<v8::Value> to;

            size_t
           stat_calls =
          Nan::ObjectWrap::Unwrap<GitCheckoutPerfdata>(info.This())->GetValue()->stat_calls;
 // start convert_to_v8 block
     to = Nan::New<Number>( stat_calls);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitCheckoutPerfdata::ChmodCalls) {
      v8::Local<v8::Value> to;

            size_t
           chmod_calls =
          Nan::ObjectWrap::Unwrap<GitCheckoutPerfdata>(info.This())->GetValue()->chmod_calls;
 // start convert_to_v8 block
     to = Nan::New<Number>( chmod_calls);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitCheckoutPerfdataTraits>;
 