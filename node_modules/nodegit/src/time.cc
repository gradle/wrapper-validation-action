// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/time.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitTime::~GitTime() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitTime::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Time").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "time", Time);
         Nan::SetPrototypeMethod(tpl, "offset", Offset);
         Nan::SetPrototypeMethod(tpl, "sign", Sign);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Time").ToLocalChecked(), _constructor_template);
  }

      // start field block
    NAN_METHOD(GitTime::Time) {
      v8::Local<v8::Value> to;

            git_time_t
           time =
          Nan::ObjectWrap::Unwrap<GitTime>(info.This())->GetValue()->time;
 // start convert_to_v8 block
     to = Nan::New<Number>( time);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitTime::Offset) {
      v8::Local<v8::Value> to;

            int
           offset =
          Nan::ObjectWrap::Unwrap<GitTime>(info.This())->GetValue()->offset;
 // start convert_to_v8 block
     to = Nan::New<Number>( offset);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitTime::Sign) {
      v8::Local<v8::Value> to;

            char
           sign =
          Nan::ObjectWrap::Unwrap<GitTime>(info.This())->GetValue()->sign;
 // start convert_to_v8 block
  if (sign){
      char convertToNullTerminated[2] = { sign, '\0' };
      to = Nan::New<v8::String>(convertToNullTerminated).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitTimeTraits>;
 